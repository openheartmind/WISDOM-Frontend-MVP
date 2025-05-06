# Wisdom Frontend

## Initial Setup

Prerequisites:
* Git
* Code IDE (e.g. VS Code)
* NodeJS

First, we clone the repository by executing the following command at your desired file path:

```
git clone https://github.com/openheartmind/WISDOM-Frontend-MVP
```

Next, open the cloned repository with your IDE and in the terminal window, execute the installation command:
```
npm i
```

To complete the setup, we need to configure all the environmental variables.

Make a copy of the file _.env.example_ and name it _.env.local_

At this point the project should be working by running the following:
```
npm run dev
```

For the purpose of validation, it is recommended to build the solution before pushing any PRs on GitHub by running the following:
```
npm run build
```

The output should provide an idea whether there are issues that might break the deployment.

