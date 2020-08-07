var config = {
  API_URL: 'https://api.stgn.dstack.ai',
  GA_ID: '',
  DOCS_URL: 'http://docs.dstack.ai',
  LOGIN_URL: '/users/login',
  VERIFY_EMAIL_URL: '/users/verify',
  USER_DATA_URL: '/users/remember',
  UPDATE_TOKEN_URL: '/users/update/token',
  UPDATE_SETTINGS_URL: '/users/update/settings',
  CHECK_USER: function CHECK_USER(userName) {
    return "/users/exists/" + userName;
  },
  STACKS_LIST: function STACKS_LIST(userName) {
    return "/stacks/" + userName;
  },
  DELETE_STACK: function DELETE_STACK() {
    return '/stacks/delete';
  },
  STACK_DETAILS: function STACK_DETAILS(userName, stack) {
    return "/stacks/" + userName + "/" + stack;
  },
  STACK_FRAME: function STACK_FRAME(userName, stack, frameId) {
    return "/frames/" + userName + "/" + stack + "/" + frameId;
  },
  STACK_ATTACHMENT: function STACK_ATTACHMENT(stack, frameId, id) {
    return "/attachs/" + stack + "/" + frameId + "/" + id;
  },
  STACK_UPDATE: '/stacks/update',
  STACK_PUSH: '/stacks/push',
  DASHBOARD_LIST: function DASHBOARD_LIST(userName) {
    return "/dashboards/" + userName;
  },
  DASHBOARD_DETAILS: function DASHBOARD_DETAILS(userName, id) {
    return "/dashboards/" + userName + "/" + id;
  },
  DASHBOARD_CREATE: '/dashboards/create',
  DASHBOARD_UPDATE: '/dashboards/update',
  DASHBOARD_DELETE: '/dashboards/delete',
  DASHBOARD_CARDS_INSERT: '/dashboards/cards/insert',
  DASHBOARD_CARDS_UPDATE: '/dashboards/cards/update',
  DASHBOARD_CARDS_DELETE: '/dashboards/cards/delete',
  DISCORD_URL: 'https://discord.gg/8xfhEYa',
  TWITTER_URL: 'https://twitter.com/dstackai',
  GITHUB_URL: ' https://github.com/dstackai',
  MEDIUM_URL: ' https://medium.com/dstackai',
  CONFIGURE_PYTHON_COMMAND: function CONFIGURE_PYTHON_COMMAND(token, userName) {
    if (token === void 0) {
      token = '<token>';
    }

    if (userName === void 0) {
      userName = '<username>';
    }

    var origin = window ? window.location.origin : '';
    return "dstack config --token " + token + " --user " + userName + " --server " + origin + "/api";
  },
  CONFIGURE_R_COMMAND: function CONFIGURE_R_COMMAND(token, userName) {
    if (token === void 0) {
      token = '<token>';
    }

    if (userName === void 0) {
      userName = '<username>';
    }

    var origin = window ? window.location.origin : '';
    return "dstack::configure(user = \"" + userName + "\", token = \"" + token + "\", persist = \"global\"" + (", server = \"" + origin + "/api\")");
  }
};

module.exports = config;
//# sourceMappingURL=config.js.map
