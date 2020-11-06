**dstack is an open-source framework for building ML applications using Python and R.**

![Action Status](https://github.com/dstackai/dstack-server/workflows/Build/badge.svg)  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![PyPI version](https://badge.fury.io/py/dstack.svg)](https://badge.fury.io/py/dstack) [![CRAN status](https://www.r-pkg.org/badges/version/dstack)](https://CRAN.R-project.org/package=dstack) [![Discord Chat](https://img.shields.io/discord/687649691688501294.svg)](https://discord.gg/)

Push ML models, visualizations, and code to dstack.ai to build beautiful applications in minutes.
No development or deployment skills are required.

How is dstack different from other frameworks (Plotly, Streamlit, Shiny, etc):
 - It simplifies the process of creating applications by 
    a) decoupling ML development and application development (by introducing an ML Registry) 
    b) leveraging a declarative approach to defining application components (ML models, datasets, reports, jobs, etc) 
- It is designed for data scientists and doesn't require development skills to build applications.

![Example of a dstack application|840x520](https://github.com/dstackai/dstack/raw/master/dstack_example.gif)

## How dstack works

The framework consists of the following parts:
- Client packages for Python ([dstack-py](https://github.com/dstackai/dstack-py)) an R ([dstack-r](https://github.com/dstackai/dstack-r)). These packages can be used from either notebooks or scripts to push data to dstack.
- A server application ([dstack-server](https://github.com/dstackai/dstack-server)). It handles the requests from the Client packages, and offers a registry for ML models, hosts jobs, reports, and data applications. The server can run locally or in Docker.  

An ML application is a specific kind of applications that solves domain-specific problems using ML and data-science libraries.

There are several general use-cases for such data science applications:

1. *Reports* – interactive visualizations with different layouts  
2. *Model registry* - Once, you've trained an ML model, you can push it to dstack.ai using the Python's push function. Later, you can pull this model to use anywhere: in a notebook, script, job, or application.
3. *Jobs* – Automate the routine of processing datasets or updating dashboards, by running regular Python or R jobs and monitoring their progress.
3. *Applications* – Interactive applications that run on the server and let users to interact with ML models and data sources (not supported yet)

Currently, dstack supports *Reports*, *Model registry*, and *Jobs*. The support for *Applications* is coming soon.
    
#### Reports

An interactive report can be currently built via the user interface of the `dstack-server` application.
    In order to create a report, one must first create *Stacks* by pushing data via the `dstack` packages from Python or R.
    The data can be dataframes (pandas, tidyverse, etc) or plots (matplotlib, plotly, ggplot, etc). 
    Once the *Stacks* are pushed, the user must open the `dstack-server` application in a browser, go to *Dashboards*,
    click *New dashboard*, and then select the *Stacks*. The `dstack-server` will automatically generate a dashboard
    out of the chosen *Stacks*.
    
It's important, that if any of the *Stacks* has multiple *Attachments* with parameters, the `dstack-server` application
    will automatically generate interactive widgets to select these parameters and update the dashboard accordingly.
    
The information on how to push artifacts to a dstack server, can be found in the [dstack-py](https://github.com/dstackai/dstack-py) an [dstack-r](https://github.com/dstackai/dstack-r) repositories correspondingly.
    
An example of such an interactive report can be seen [here](https://dstack.ai/cheptsov/d/505d2087-9adc-49e3-88de-6b46079c394f).

## Installation

The `dstack` package can be easily installed via either pip or conda:

```bash
pip install dstack
```

```bash
conda install dstack -c dstack.ai
```

The package comes with a command line tool called `dstack`. This command line tool can be used to configure local profiles, credentials, and to run a local server. 

If you're using R and don't need the command line tool, you can install the `dstack` package for R via the following command:

```R
install.packages('dstack')
```

## Quick start

### Run a server

In order to run a server locally, one must run this command line:

```bash
dstack server start
```

You'll see the following output:

```
To access the dstack server, open one of these URLs in the browser:
		http://localhost:8080/auth/verify?user=dstack&code=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&next=/

If you're using Python, use the following command line command to configure your dstack profile:
	pip install dstack
	dstack config add --token xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --user dstack --server http://localhost:8080/api

If you're using R, use the following R command to configure your dstack profile:
	install.packages("dstack")
	dstack::configure(user = "dstack", token = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", persist = "global", server = "http://localhost:8080/api")
```

Note, in your case instead of `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` you'll see your personal code.

The server by default uses the `8080` port. Optionally, you can specify a custom port by using the command line option `--port`:

```bash
dstack server start --port 8081
```

Note, by default, the server stores all the data under `.dstack` in the user home directory. In case you'd like to store the `.dstack` folder in a different place, use the following command:

```bash
dstack server start --home <other_directory>
```

In this case, the server will store all the data in `<other_directory>/.dstack/`. 

### Configure a user profile

In order to send requests to the locally running server, one must run the command suggested in the output:

```bash
dstack config add --token xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --user dstack --server http://localhost:8080/api
```

### Push artifacts

Pushing ML models, datasets and visualization to the server is done via the `dstack` packages available for both Python and R. 
    These packages can be used from dstack's *Jobs*, or from Jupyter notebooks, RMarkdown, Python and R scripts and applications.
    
Once data is pushed to the server, it can be accessed via the URL returned in the response, 
    for example `http://localhost:8080/<username>/<stackname>` or via the web application's interface.

The pushed *Stacks* can be combined into interactive *Reports* via the web application's interface.

## Contribution

If you'd like to contribute, be sure to write us first in the [Discord channel](https://discord.gg/8xfhEYa). Our team will be very happy to 
help you with onboarding, finding the areas where you can help best, and of course getting technical help!   

### Building dstack from source

#### 1. Set up your environment

dstack is a Spring Boot application written in Kotlin, that bundles a pre-build React application written in JavaScript.
In order to run the entire server with both front-end and back-end together, one must build both React and Spring applications.

In order to build dstack locally, you'll need to have `Java`, `yarn`, and `npm`. Make sure you have them installed locally.

#### 2. Building React application

The code of the React application resides in the folder `website`. This application bundles using [microbundle](https://github.com/developit/microbundle) 
the React component that resides in the `dstack-react` folder. The `website` React application consumes the `dstack-react` component by importing `@dstackai/dstack-react`.

Before you can build the `website` React application, you first have to build the `dstack-react` React component by running 
the following command from the folder `dstack-react`:

```bash
$ yarn install && npm run-script build
```

Now, you can build the React application folder by running the following command from the `website`:

```bash
$ yarn install && npm run-script build
```

#### 3. Building Spring Boot application

Before building the Spring Boot application, you first have to copy the pre-built distributive of the React application 
from `website/build` to `server-local-cli/src/main/resources/website`. This can be done by the following Gradle task:

```bash
$ ./gradlew copyWebsite
```

Now, that you've copied the front-end application, you can run the Spring Boot application the following way:

```bash
$ ./gradlew bootRun
```

That's it! You're all set 🎉 When you do it, you'll see the following output:

```bash
> Task :server-local-cli:bootRun
To access the application, open this URL in the browser: http://localhost:8080/auth/verify?user=dstack&code=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&next=/
```