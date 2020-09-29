import optparse
import signal
import subprocess
import sys
import traceback
import threading
import time
import requests
import uuid
import os
from pathlib import Path

from io import StringIO
from contextlib import redirect_stdout

proc_file = None
proc = None


def exec_code(job_user_token, job_runtime, job_code, rscript_executable):
    global proc_file, proc

    exec_id = str(uuid.uuid1())
    extension = ".py" if job_runtime == "python" else ".R"
    program = sys.executable if job_runtime == "python" else rscript_executable
    filename = exec_id + extension
    proc_file = open("executions/" + job_user_token + "/" + filename, "w")
    proc_file.write(job_code)
    proc_file.close()

    my_env = os.environ.copy()
    my_env["DSTACK_CONFIG"] = "./config.yaml" if job_runtime == "python" else "./.dstack/config.yaml"
    proc = subprocess.Popen([program, filename],
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT,
                            cwd="executions/" + job_user_token,
                            env=my_env
                            )

    while proc.poll() is None:
        line = proc.stdout.readline()
        if not line:
            break
        print(line.decode("utf-8"))

    os.remove(proc_file.name)
    proc = None
    proc_file = None


def run_job(server_url, job_user_name, job_user_token, job_runtime, job_code, rscript_executable):
    Path("executions/" + job_user_token).mkdir(parents=True, exist_ok=True)
    p = subprocess.Popen(["dstack", "config", "add", "--server", server_url, "--token", job_user_token,
                          "--user", job_user_name, "--force", "--file",
                          "./config.yaml" if job_runtime == "python" else "./.dstack/config.yaml"],
                         cwd="executions/" + job_user_token)
    p.wait()

    exec_code(job_user_token, job_runtime, job_code, rscript_executable)


class AbortException(Exception):
    pass


def abort_handler(_signal, _frame):
    raise AbortException


job_run_stopping = False


def update_job_status(server_url, user_name, user_token, job_id, job_status, job_logs=None, job_started_at=None,
                      job_finished_at=None):
    payload = {
        "user": user_name,
        "id": job_id,
        "status": job_status
    }
    if job_logs is not None:
        payload["logs"] = job_logs
    if job_started_at is not None:
        payload["started_at"] = job_started_at
    if job_finished_at is not None:
        payload["finished_at"] = job_finished_at
    status = requests.post(server_url + "/jobs/update", headers={"Authorization": "Bearer " + user_token},
                           json=payload).json()
    if status.get("job") and status["job"]["status"] == "STOPPING":
        global job_run_stopping
        job_run_stopping = True
        signal.alarm(1)
        return False
    else:
        return True


def main():
    signal.signal(signal.SIGALRM, abort_handler)

    parser = optparse.OptionParser()
    parser.add_option("-s", "--server", dest="server")
    parser.add_option("-u", "--user", dest="user")
    parser.add_option("-t", "--token", dest="token")
    parser.add_option("-r", "--runtime", dest="runtime")
    parser.add_option("-j", "--job", dest="job")
    parser.add_option("-c", "--code", dest="code")
    parser.add_option("-a", "--rscript", dest="rscript")

    options, args = parser.parse_args()

    if options.user and options.token and options.job and options.code:
        server_url = options.server
        job_user_name = options.user
        job_user_token = options.token
        job_runtime = options.runtime
        job_id = options.job
        job_code = options.code
        rscript_executable = options.rscript if options.rscript else "Rscript"

        logs_handler = StringIO()
        job_is_running = True
        try:
            print(
                "Running job: " + job_user_name + "/" + job_id + "; runtime: " + job_runtime + "; server_url: " + server_url)
            is_first_job_update = True

            def monitor_job_status():
                nonlocal is_first_job_update
                if job_is_running:
                    if update_job_status(server_url, job_user_name, job_user_token, job_id, "RUNNING",
                                         logs_handler.getvalue(),
                                         job_started_at=round(time.time() * 1000) if is_first_job_update else None):
                        is_first_job_update = False
                        threading.Timer(10.0, monitor_job_status).start()

            monitor_job_status()
            signal.alarm(10 * 60 - 30)  # 10 minutes
            with redirect_stdout(logs_handler):
                run_job(server_url, job_user_name, job_user_token, job_runtime, job_code, rscript_executable)
            job_is_running = False
            update_job_status(server_url, job_user_name, job_user_token, job_id, "FINISHED", logs_handler.getvalue(),
                              job_finished_at=round(time.time() * 1000))
        except AbortException:
            job_is_running = False
            global job_run_stopping
            if job_run_stopping:
                update_job_status(server_url, job_user_name, job_user_token, job_id, "STOPPED", logs_handler.getvalue(),
                                  job_finished_at=round(time.time() * 1000))
            else:
                update_job_status(server_url, job_user_name, job_user_token, job_id, "TIMEOUT", logs_handler.getvalue(),
                                  job_finished_at=round(time.time() * 1000))
        except Exception:
            job_is_running = False
            error = str(traceback.format_exc())
            logs = logs_handler.getvalue()
            update_job_status(server_url, job_user_name, job_user_token, job_id, "FAILED",
                              error if not logs else logs + "\n" + error,
                              job_finished_at=round(time.time() * 1000))
        finally:
            if proc:
                proc.terminate()
            if proc_file:
                os.remove(proc_file.name)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
