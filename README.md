**dstack is an open-source framework for Python and R for managing data science artifacts, and for building data science applications.**

How is dstack different from other frameworks:
 - It is designed for data scientists and doesn't require development skills to build applications.   
 - It simplifies the process of creating applications by leveraging a) a declarative approach to defining application components; b) a tight integration with data science frameworks and tools.

The key features of dstack:
- Capabilities for building interactive applications (this currently includes dashboards and reports; the support for ML models is coming soon) 
- Management of datasets (e.g. tracking revisions of datasets, pushing and pulling datasets)

## How dstack works

The framework consists of the following parts:
- Client packages for Python ([dstack-py](https://github.com/dstackai/dstack-py)) an R ([dstack-r](https://github.com/dstackai/dstack-r)). These packages can be used from either notebooks or scripts to push data to dstack.
- A server application ([dstack-server](https://github.com/dstackai/dstack-server)). It handles the requests from the Client packages, and serve data applications. The application can run locally or in Docker.  

There are two general use-cases for dstack:

### Use case #1: Managing data science artifacts

The results of a data science process normally may include all kind of datasets, visualizations, ML models, text and binary files, etc. 

The `dstack-server` application serves as a storage engine to store these artifacts and track their revisions and meta-data.
The `dstack-py` and `dstack-r` packages provides the capabilities to push and pull these artifacts to and from the corresponding instance of `dstack-server`.

The dstack framework uses the following abstractions to represent artifacts:

- A *Stack* has a human-readable name (*Stack Name*), the ID of its latest frame (*Frame* or *Stack Head*), and the name of the user it belongs to (*User*) 
- A *Frame* represents a unique revision of a *Stack*. It has a unique ID (*Frame ID*), a human-readable description (*Frame Description*),and a set of *Attachments*.  
- An *Attachment* has a data (*Attachment Data*) which can be either plain or binary, a MIME type of the data (*Attachment Content Type*),
   an application name which can interpret this type of data (*Attachment Application*), 
   and most importantly a key/value dictionary with the metadata associated with the *Attachment* (*Attachment Params*).
- A *User* has a human-readable name (*Username*), and a secret token for authorization (*User Token*).
- A *User Profile* has a human readable name (*Profile Name*), a *Username*, a *User Token*, and the URL of the server API (*Server URL*). 
    User profiles are configured locally to authorize the requests from the `dstack` packages.
   
The workflow in this case is the following:

- Install the `dstack` package (e.g. via `pip` or `conda`)
- Runs `dstack-server` (e.g. using the `dstack server` dstack CLI command)
- Configure a dstack profile (e.g. using the `dstack config` dstack CLI command) 
- Push or pull *Stack Frames* from Jupyter notebooks, Rmarkdown files or any Python or R scripts. Pushing and pulling is done via the `dstack` packages for Python or R. 

### Use case #2: Building data science applications

TBA

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
install.packages("dstack")
```

## Quick start

### Run a dstack server

TBA

### Configure a user profile

TBA

### Push artifacts to server

TBA

### Pull artifacts from server

TBA

### Accessing artifacts via the server's user interface

TBA

### Building dashboards via the server's user interface

TBA

