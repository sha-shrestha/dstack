function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var cx = _interopDefault(require('classnames'));
var Highlight = _interopDefault(require('react-highlight.js'));
var reactI18next = require('react-i18next');
var copy = _interopDefault(require('copy-to-clipboard'));
var RcTooltip = _interopDefault(require('rc-tooltip'));
var lodashEs = require('lodash-es');
var moment = _interopDefault(require('moment'));
var ReactMarkdown = _interopDefault(require('react-markdown'));
var MathJax = _interopDefault(require('react-mathjax'));
var RemarkMathPlugin = _interopDefault(require('remark-math'));
var reactPortal = require('react-portal');
var Select = require('rc-select');
var Select__default = _interopDefault(Select);
var Slider = _interopDefault(require('rc-slider'));
var Plot = _interopDefault(require('react-plotly.js'));
var CSV = require('csv-string');
var axios = _interopDefault(require('axios'));
var api = _interopDefault(require('api'));
var reactRouterDom = require('react-router-dom');
var config$1 = _interopDefault(require('config'));
var hooks = require('hooks');
var routes = _interopDefault(require('routes'));
var reactRouter = require('react-router');
var dstackReact = require('@dstackai/dstack-react');

var image = require("./lock~ZBorChcU.svg");

var css = {"forbidden":"_style-module__forbidden__3PN84","message":"_style-module__message__2i8KH"};

var AccessForbidden = function AccessForbidden(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css.forbidden
  }, /*#__PURE__*/React__default.createElement("img", {
    src: image,
    alt: "",
    width: "85",
    height: "104"
  }), children && /*#__PURE__*/React__default.createElement("div", {
    className: css.message
  }, children));
};

var css$1 = {"avatar":"_styles-module__avatar__3xvkT"};

var Avatar = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      name = _ref.name,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'violet' : _ref$color,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'normal' : _ref$size,
      withBorder = _ref.withBorder,
      onClick = _ref.onClick;
  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$1.avatar, className, color, size, {
      border: withBorder
    }),
    onClick: onClick
  }, name.slice(0, 2));
});

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var css$2 = {"back":"_styles-module__back__1MuhU"};

var BackButton = function BackButton(_ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'button' : _ref$Component,
      children = _ref.children,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["Component", "children", "className"]);

  return /*#__PURE__*/React__default.createElement(Component, _extends({
    className: cx(css$2.back, className)
  }, props), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-arrow-left"
  }), children);
};

var css$3 = {"button":"_style-module__button__2lKoS","spinner":"_style-module__spinner__31PPt"};

var css$4 = {"spinner":"_styles-module__spinner__3XhrC","spinner-animation":"_styles-module__spinner-animation__2UA3s"};

var COLORS = {
  white: '#fff',
  blue: '#507CD0'
};

var Spinner = function Spinner(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 22 : _ref$size,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'white' : _ref$color,
      isShown = _ref.isShown,
      className = _ref.className,
      align = _ref.align;
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$4.spinner, className, align, {
      show: isShown
    })
  }, /*#__PURE__*/React__default.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M11.7046 18.9689C13.3618 18.8224 14.9321 18.1628 16.1969 17.0821C17.4617 16.0014 18.3581 14.5532 18.7614 12.9392C19.1647 11.3252 19.0548 9.62557 18.4469 8.07695C17.839 6.52832 16.7635 5.20773 15.37 4.29897C13.9765 3.39021 12.3343 2.9385 10.672 3.00671C9.00979 3.07491 7.41015 3.65964 6.09577 4.67951C4.78139 5.69938 3.81766 7.10365 3.33871 8.69687C2.85976 10.2901 2.88943 11.993 3.42358 13.5686L5.19569 12.9678C4.78648 11.7607 4.76375 10.4561 5.13067 9.23556C5.4976 8.01499 6.23591 6.93918 7.24286 6.15785C8.24981 5.37653 9.4753 4.92857 10.7488 4.87632C12.0222 4.82406 13.2803 5.17012 14.3478 5.86632C15.4154 6.56253 16.2394 7.57423 16.7051 8.76064C17.1708 9.94704 17.255 11.2491 16.946 12.4856C16.6371 13.7221 15.9503 14.8316 14.9814 15.6595C14.0124 16.4875 12.8094 16.9927 11.5398 17.105L11.7046 18.9689Z",
    fill: "url(#paint0_linear)"
  }), /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement("linearGradient", {
    id: "paint0_linear",
    x1: "13.5",
    y1: "18",
    x2: "4",
    y2: "13",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__default.createElement("stop", {
    stopColor: COLORS[color]
  }), /*#__PURE__*/React__default.createElement("stop", {
    offset: "1",
    stopColor: COLORS[color],
    stopOpacity: "0.2"
  })))));
};

var Button = React.forwardRef(function (_ref, ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'button' : _ref$Component,
      children = _ref.children,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'normal' : _ref$size,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'default' : _ref$color,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'default' : _ref$variant,
      _ref$fullWidth = _ref.fullWidth,
      fullWidth = _ref$fullWidth === void 0 ? false : _ref$fullWidth,
      isShowSpinner = _ref.isShowSpinner,
      props = _objectWithoutPropertiesLoose(_ref, ["Component", "children", "className", "size", "color", "variant", "fullWidth", "isShowSpinner"]);

  return /*#__PURE__*/React__default.createElement(Component, _extends({
    ref: ref,
    className: cx(css$3.button, size, "color-" + color, "variant-" + variant, className, {
      'full-width': fullWidth
    })
  }, props), isShowSpinner && /*#__PURE__*/React__default.createElement(Spinner, {
    className: css$3.spinner,
    color: "white",
    isShown: true
  }), children);
});

var css$5 = {"checkbox":"_styles-module__checkbox__3lqFk","toggle-label":"_styles-module__toggle-label__1aLAG","label":"_styles-module__label__2PZb-","wrapper":"_styles-module__wrapper__2Vufp","mark":"_styles-module__mark__2Pb2f"};

var CheckboxField = function CheckboxField(_ref) {
  var className = _ref.className,
      value = _ref.value,
      disabled = _ref.disabled,
      _ref$appearance = _ref.appearance,
      appearance = _ref$appearance === void 0 ? 'checkbox' : _ref$appearance,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'left' : _ref$align,
      label = _ref.label,
      onLabel = _ref.onLabel,
      offLabel = _ref.offLabel,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "value", "disabled", "appearance", "align", "label", "onLabel", "offLabel", "children"]);

  return /*#__PURE__*/React__default.createElement("label", {
    className: cx(css$5.checkbox, className, appearance, align, {
      disabled: disabled
    })
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("input", _extends({
    type: "checkbox",
    checked: value
  }, props)), offLabel && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$5['toggle-label'], 'off'),
    dangerouslySetInnerHTML: {
      __html: offLabel
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$5.wrapper
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$5.mark, 'mdi', 'mdi-check', {
      'toggle-color': !(onLabel && offLabel)
    })
  })), onLabel && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$5['toggle-label'], 'on'),
    dangerouslySetInnerHTML: {
      __html: onLabel
    }
  }), label && /*#__PURE__*/React__default.createElement("span", {
    className: css$5.label
  }, label)), children);
};

var css$6 = {"copy":"_styles-module__copy__3J5hd","message":"_styles-module__message__3RWnQ","button":"_styles-module__button__2YqEb","icon":"_styles-module__icon__25GMO"};

var Copy = function Copy(_ref) {
  var children = _ref.children,
      className = _ref.className,
      copyText = _ref.copyText,
      successMessage = _ref.successMessage,
      buttonTitle = _ref.buttonTitle;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(false),
      isShowMessage = _useState[0],
      setIsShowMessage = _useState[1];

  var onCLick = function onCLick() {
    copy(copyText);
    setIsShowMessage(true);
    setTimeout(function () {
      return setIsShowMessage(false);
    }, 3000);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$6.copy, className)
  }, children ? children({
    onClick: onCLick
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$6.button,
    onClick: onCLick
  }, /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$6.icon, 'mdi mdi-content-copy')
  }), buttonTitle ? buttonTitle : t('copy')), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$6.message, {
      'is-show': isShowMessage
    })
  }, successMessage ? successMessage : t('copied')));
};

var css$7 = {"code":"_styles-module__code__3gARj","copy":"_styles-module__copy__m44gX","icon":"_styles-module__icon__ZmZbg"};

var CodeViewer = function CodeViewer(_ref) {
  var className = _ref.className,
      language = _ref.language,
      children = _ref.children,
      fontSize = _ref.fontSize;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$7.code, className, fontSize && "font-size-" + fontSize)
  }, /*#__PURE__*/React__default.createElement(Highlight, {
    language: language
  }, children), /*#__PURE__*/React__default.createElement(Copy, {
    className: css$7.copy,
    copyText: children,
    successMessage: t('snippetIsCopied')
  }));
};

var css$8 = {"dropdown":"_styles-module__dropdown__1qRCw","button":"_styles-module__button__fzNEm","menu":"_styles-module__menu__AJ1Y3","item":"_styles-module__item__3lbfY"};

var Dropdown = function Dropdown(_ref) {
  var className = _ref.className,
      buttonClassName = _ref.buttonClassName,
      children = _ref.children,
      items = _ref.items;

  var _useState = React.useState(false),
      isShow = _useState[0],
      setIsShow = _useState[1];

  var buttonRef = React.useRef(null);
  var dropdownRef = React.useRef(null);
  React.useEffect(function () {
    document.body.addEventListener('click', outlineClickHandle);
    return function () {
      return document.body.removeEventListener('click', outlineClickHandle);
    };
  });

  var outlineClickHandle = function outlineClickHandle(event) {
    var targetElement = event.target;

    do {
      if (targetElement === buttonRef.current || targetElement === dropdownRef.current) return;
      targetElement = targetElement.parentNode;
    } while (targetElement);

    if (isShow) setIsShow(false);
  };

  var onCLickButton = function onCLickButton(event) {
    clickStopPropagation(event);
    setIsShow(!isShow);
  };

  var clickStopPropagation = function clickStopPropagation(event) {
    event.stopPropagation();
    event.preventDefault();
  };

  var onCLickItem = function onCLickItem(item) {
    return function () {
      setIsShow(!isShow);
      if (item.onClick) item.onClick();
    };
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$8.dropdown, className, {
      active: isShow
    })
  }, /*#__PURE__*/React__default.createElement(RcTooltip, {
    arrowContent: null,
    visible: isShow,
    placement: "bottomRight",
    destroyTooltipOnHide: true,
    align: {
      offset: [0, 0]
    },
    overlay: /*#__PURE__*/React__default.createElement("div", {
      className: cx(css$8.menu, 'show'),
      ref: dropdownRef,
      onClick: clickStopPropagation
    }, items.map(function (i, index) {
      return /*#__PURE__*/React__default.createElement("div", {
        key: index,
        className: css$8.item,
        onClick: onCLickItem(i)
      }, i.title);
    }))
  }, children ? React__default.cloneElement(children, {
    onClick: onCLickButton,
    ref: buttonRef
  }) : /*#__PURE__*/React__default.createElement("div", {
    ref: buttonRef,
    className: cx(css$8.button, buttonClassName),
    onClick: onCLickButton
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-vertical"
  }))));
};

var unicodeBase64Decode = function unicodeBase64Decode(text) {
  try {
    var decodeData = window.atob(text);
    return decodeURIComponent(Array.prototype.map.call(decodeData, function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    return null;
  }
};

var formatBytes = function formatBytes(bytes, decimals) {
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var dm = decimals <= 0 ? 0 : decimals || 2;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

var parseStackParams = (function (attachments) {
  var fields = {};
  if (!attachments || !attachments.length) return;
  attachments.forEach(function (i) {
    Object.keys(i.params).forEach(function (key) {
      if (fields[key]) fields[key].options.push(i.params[key]);else fields[key] = {
        options: [i.params[key]]
      };
    });
  });
  Object.keys(fields).forEach(function (key) {
    if (typeof fields[key].options[0] === 'string') {
      fields[key].type = 'select';
      fields[key].options = fields[key].options.filter(function (a, b) {
        return fields[key].options.indexOf(a) === b;
      }).map(function (i) {
        return {
          label: i,
          value: i
        };
      });
    }

    if (typeof fields[key].options[0] === 'boolean') {
      fields[key].type = 'checkbox';
    }

    if (typeof fields[key].options[0] === 'number') {
      var options = fields[key].options;
      fields[key].type = 'slider';
      fields[key].min = Math.min.apply(null, options);
      fields[key].max = Math.max.apply(null, options);
      fields[key].options = {};
      options.filter(function (a, b) {
        return options.indexOf(a) === b;
      }).forEach(function (i) {
        return fields[key].options[i] = i;
      });
    }
  });
  return fields;
});

var css$9 = {"dnd":"_style-module__dnd__3uYii","file":"_style-module__file__2LG6L","fileExtend":"_style-module__fileExtend__3w6--","fileSection":"_style-module__fileSection__B8y5t","fileName":"_style-module__fileName__3Juxo","fileSize":"_style-module__fileSize__3G6N8","fileRemove":"_style-module__fileRemove__16dzP","placeholder":"_style-module__placeholder__Wr_Zp","loading":"_style-module__loading__2KndP","progressBar":"_style-module__progressBar__DHbC1","progress":"_style-module__progress__2-dth","animate-stripes":"_style-module__animate-stripes__1Iecq"};

var FileDragnDrop = function FileDragnDrop(_ref) {
  var formats = _ref.formats,
      className = _ref.className,
      loading = _ref.loading,
      _ref$progressPercent = _ref.progressPercent,
      progressPercent = _ref$progressPercent === void 0 ? null : _ref$progressPercent,
      onChange = _ref.onChange;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var inputRef = React.useRef(null);

  var _useState = React.useState(false),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = React.useState(),
      selectedFile = _useState2[0],
      setSelectedFile = _useState2[1];

  var isDidMount = React.useRef(true);
  React.useEffect(function () {
    if (!isDidMount.current) {
      if (onChange) onChange(selectedFile);
    } else isDidMount.current = false;
  }, [selectedFile]);

  var onClick = function onClick(event) {
    event.preventDefault();
    if (inputRef.current) inputRef.current.click();
  };

  var preventStop = function preventStop(event) {
    event.preventDefault();
    event.stopPropagation();
  };

  var onDrop = function onDrop(event) {
    preventStop(event);
    setActive(false);
    var _event$dataTransfer$f = event.dataTransfer.files,
        file = _event$dataTransfer$f[0];
    if (file && checkAvailableExtension(file)) setSelectedFile(file);
  };

  var onDragEnter = function onDragEnter(event) {
    preventStop(event);
    setActive(true);
  };

  var onDragLeave = function onDragLeave(event) {
    preventStop(event);
    setActive(false);
  };

  var onChangeInput = function onChangeInput(event) {
    var _event$target$files = event.target.files,
        file = _event$target$files[0];
    if (file && checkAvailableExtension(file)) setSelectedFile(file);
  };

  var removeFile = function removeFile() {
    setSelectedFile(null);
  };

  var checkAvailableExtension = function checkAvailableExtension(file) {
    var ext = '.' + file.name.split('.').pop();
    var isAvailable;
    if (formats && formats.length) isAvailable = formats.some(function (format) {
      if (format === '.jpg' || format === '.jpeg') return ext === '.jpg' || ext === '.jpeg';else return format === ext;
    });else isAvailable = true;
    return isAvailable;
  };

  if (loading) return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.dnd, className, {
      active: active
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.loading
  }, t('Uploading'), "\u2026", typeof progressPercent === 'number' && progressPercent + "%"), typeof progressPercent === 'number' && /*#__PURE__*/React__default.createElement("div", {
    className: css$9.progressBar
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.progress,
    style: {
      width: progressPercent + "%"
    }
  })));
  if (selectedFile) return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.file, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileExtend
  }, ".csv"), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSection
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileName
  }, selectedFile.name), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSize
  }, formatBytes(selectedFile.size))), /*#__PURE__*/React__default.createElement("div", {
    onClick: removeFile,
    className: cx(css$9.fileRemove, 'mdi mdi-close')
  }));
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.dnd, className, {
      active: active
    }),
    onDrop: onDrop,
    onDragEnter: onDragEnter,
    onDragOver: onDragEnter,
    onDragLeave: onDragLeave
  }, /*#__PURE__*/React__default.createElement("input", {
    ref: inputRef,
    onChange: onChangeInput,
    type: "file"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.placeholder
  }, t('dragHereAFile'), '', Boolean(formats) && "(" + formats.join(', ') + ")", ' ', t('or'), ' ', /*#__PURE__*/React__default.createElement("a", {
    onClick: onClick,
    href: "#"
  }, t('upload')), ' ', t('fromYourComputer'), "."));
};

var css$a = {"loader":"_styles-module__loader__18_Ho","text":"_styles-module__text__3dZu_","stacks-pulse":"_styles-module__stacks-pulse__350eA","grid":"_styles-module__grid__Uki0v","item":"_styles-module__item__MvjKB","pic":"_styles-module__pic__Pc6fT","section":"_styles-module__section__2EIKh"};

var Loader = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$a.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  }))));
};

var MarkdownRender = function MarkdownRender(props) {
  var newProps = _extends({}, props, {
    plugins: [RemarkMathPlugin],
    renderers: _extends({}, props.renderers, {
      math: function math(props) {
        return /*#__PURE__*/React__default.createElement(MathJax.Node, {
          formula: props.value
        });
      },
      inlineMath: function inlineMath(props) {
        return /*#__PURE__*/React__default.createElement(MathJax.Node, {
          inline: true,
          formula: props.value
        });
      }
    })
  });

  return /*#__PURE__*/React__default.createElement(MathJax.Provider, {
    input: "tex"
  }, /*#__PURE__*/React__default.createElement(ReactMarkdown, newProps));
};

var css$b = {"modal":"_styles-module__modal__3FQ59","dialog":"_styles-module__dialog__268e0","close":"_styles-module__close__1Y7yz","title":"_styles-module__title__knxNI"};

var Modal = function Modal(_ref) {
  var title = _ref.title,
      className = _ref.className,
      dialogClassName = _ref.dialogClassName,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'big' : _ref$size,
      onClose = _ref.onClose,
      isShow = _ref.isShow,
      children = _ref.children,
      withCloseButton = _ref.withCloseButton;

  var onClickByLayer = function onClickByLayer(event) {
    if (event.currentTarget === event.target && onClose) onClose();
  };

  return /*#__PURE__*/React__default.createElement(reactPortal.Portal, null, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$b.modal, className, {
      show: isShow
    }),
    onClick: onClickByLayer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$b.dialog, size, dialogClassName)
  }, withCloseButton && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$b.close, 'mdi mdi-close'),
    onClick: onClose
  }), title && /*#__PURE__*/React__default.createElement("div", {
    className: css$b.title
  }, title), children)));
};

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

var image$1 = require("./404~FXFqzVOe.svg");

var css$c = {"not-found":"_style-module__not-found__tAZyq","message":"_style-module__message__3Ok1U","help":"_style-module__help__Aa8x8"};

var NotFound = function NotFound(_ref) {
  var children = _ref.children;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$c['not-found']
  }, /*#__PURE__*/React__default.createElement("img", {
    src: image$1,
    alt: "",
    width: "224",
    height: "77"
  }), children && /*#__PURE__*/React__default.createElement("div", {
    className: css$c.message
  }, children), /*#__PURE__*/React__default.createElement("div", {
    className: css$c.help
  }, t('needHelpWWriteToUsOn'), ' ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.TWITTER_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-twitter"
  }), " Twitter"), ', ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.GITHUB_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-github-circle"
  }), "GitHub"), ' ', t('or'), ' ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.DISCORD_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-discord"
  }), "Discord")));
};

var usePrevious = (function (value) {
  var ref = React.useRef(value);
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
});

var useOnClickOutside = (function (ref, handler) {
  React.useEffect(function () {
    var listener = function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return function () {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
});

var isEmail = function isEmail(value) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};
var isRequired = function isRequired(value) {
  return !(value === null || value === undefined || value === '');
};
var noSpaces = function noSpaces(value) {
  return /^[\S]*$/.test(value);
};
var isValidStackName = function isValidStackName(value) {
  return /^[^\/]/.test(value) && /^[a-zA-Z0-9\/_]+$/.test(value);
};

var validationMap = {
  required: isRequired,
  email: isEmail,
  'no-spaces-stack': noSpaces,
  'stack-name': isValidStackName
};

var getValidationFunction = function getValidationFunction(validator) {
  if (typeof validator === 'string' && validationMap[validator]) return validationMap[validator];
  if (typeof validator === 'function') return validator;
  return function () {
    return true;
  };
};

var useForm = (function (initialFormState, fieldsValidators) {
  if (fieldsValidators === void 0) {
    fieldsValidators = {};
  }

  var _useState = React.useState(initialFormState),
      form = _useState[0],
      setForm = _useState[1];

  var _useState2 = React.useState({}),
      formErrors = _useState2[0],
      setFormErrors = _useState2[1];

  var onChange = function onChange(eventOrName, value) {
    var _extends2, _extends3;

    var name;
    var fieldValue;

    if (eventOrName.target) {
      var event = eventOrName;
      fieldValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      name = event.target.name;
    } else {
      name = eventOrName;
      fieldValue = value;
    }

    setForm(_extends({}, form, (_extends2 = {}, _extends2[name] = fieldValue, _extends2)));
    setFormErrors(_extends({}, formErrors, (_extends3 = {}, _extends3[name] = [], _extends3)));
  };

  var resetForm = function resetForm() {
    setForm(initialFormState);
    setFormErrors({});
  };

  var getFieldErrors = function getFieldErrors(fieldName) {
    var errors = [];
    if (Array.isArray(fieldsValidators[fieldName])) fieldsValidators[fieldName].forEach(function (validator) {
      var isValid = getValidationFunction(validator);
      if (!isValid(form[fieldName])) errors.push(validator);
    });

    if (typeof fieldsValidators[fieldName] === 'string') {
      var isValid = getValidationFunction(fieldsValidators[fieldName]);
      if (!isValid(form[fieldName])) errors.push(fieldsValidators[fieldName]);
    }

    return errors;
  };

  var checkValidForm = function checkValidForm() {
    var isValid = true;
    var newFormErrors = {};
    Object.keys(fieldsValidators).forEach(function (fieldName) {
      var errors = getFieldErrors(fieldName);
      newFormErrors[fieldName] = errors;
      isValid = isValid && !errors.length;
    });
    setFormErrors(newFormErrors);
    return isValid;
  };

  return {
    form: form,
    setForm: setForm,
    formErrors: formErrors,
    setFormErrors: setFormErrors,
    resetForm: resetForm,
    onChange: onChange,
    checkValidForm: checkValidForm
  };
});

var useIntersectionObserver = (function (callBack, _ref, deps) {
  var _ref$rootMargin = _ref.rootMargin,
      rootMargin = _ref$rootMargin === void 0 ? '0px' : _ref$rootMargin,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 0.01 : _ref$threshold,
      _ref$root = _ref.root,
      root = _ref$root === void 0 ? null : _ref$root;
  var ref = React.useRef(null);
  var intersectionCallback = React.useCallback(function (_ref2) {
    var target = _ref2[0];

    if (target.isIntersecting) {
      callBack();
    }
  }, deps);
  React.useEffect(function () {
    var options = {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold
    };
    var observer = new IntersectionObserver(intersectionCallback, options);
    if (ref && ref.current) observer.observe(ref.current);
    return function () {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, intersectionCallback]);
  return [ref];
});

var css$d = {"bar":"_styles-module__bar__12oWc","progress":"_styles-module__progress__3JWjz"};

var ProgressBar = function ProgressBar(_ref) {
  var className = _ref.className,
      isActive = _ref.isActive,
      globalProgress = _ref.progress;

  var _useState = React.useState(0),
      progress = _useState[0],
      setProgress = _useState[1];

  var _useState2 = React.useState(1000),
      width = _useState2[0],
      setWidth = _useState2[1];

  var prevIsActive = usePrevious(isActive);
  var step = React.useRef(0.01);
  var currentProgress = React.useRef(0);
  var requestFrame = React.useRef(null);
  var ref = React.useRef(null);
  React.useEffect(function () {
    if (isActive) {
      setProgress(0);
      step.current = 0.01;
      currentProgress.current = 0;
      startCalculateProgress();
    }

    if (prevIsActive === true && isActive === false) {
      if (requestFrame.current) cancelAnimationFrame(requestFrame.current);
      setProgress(100);
      setTimeout(function () {
        return setProgress(0);
      }, 800);
    }

    if (isActive === null) {
      if (requestFrame.current) cancelAnimationFrame(requestFrame.current);
      setProgress(0);
    }
  }, [isActive]);
  React.useEffect(function () {
    if (globalProgress !== null) setProgress(globalProgress);else {
      setProgress(0);
    }
  }, [globalProgress]);
  React.useEffect(function () {
    window.addEventListener('resize', onResize);
    if (ref.current) setWidth(ref.current.offsetWidth);
    return function () {
      return window.removeEventListener('resize', onResize);
    };
  }, []);

  var startCalculateProgress = function startCalculateProgress() {
    requestAnimationFrame(calculateProgress);
  };

  var calculateProgress = React.useCallback(function () {
    currentProgress.current += step.current;
    var progress = Math.round(Math.atan(currentProgress.current) / (Math.PI / 2) * 100 * 1000) / 1000;
    setProgress(progress);
    if (progress > 70) step.current = 0.005;
    if (progress >= 100) cancelAnimationFrame(requestFrame.current);
    requestFrame.current = requestAnimationFrame(calculateProgress);
  }, [isActive]);

  var onResize = function onResize() {
    if (ref.current) setWidth(ref.current.offsetWidth);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$d.bar, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$d.progress,
    style: {
      width: progress + "%",
      backgroundSize: width + "px 5px"
    }
  }));
};

var css$e = {"field":"_styles-module__field__3WCaE","input":"_styles-module__input__9Tk5W","label":"_styles-module__label__1mHtq","error":"_styles-module__error__3jOrk"};

var TextField = function TextField(_ref) {
  var label = _ref.label,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'normal' : _ref$size,
      _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? [] : _ref$errors,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "className", "size", "errors"]);

  var hasErrors = Boolean(errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$e.field, className, size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$e.input
  }, /*#__PURE__*/React__default.createElement("input", _extends({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.error
  }, errors.join(', '))));
};

var css$f = {"search":"_styles-module__search__3s1gr","field":"_styles-module__field__17rsB","clear":"_styles-module__clear__3oKZ5","button":"_styles-module__button__3BfRl"};

var SearchField = function SearchField(_ref) {
  var className = _ref.className,
      showEverything = _ref.showEverything,
      isDark = _ref.isDark,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "showEverything", "isDark"]);

  var _useState = React.useState(showEverything || props.value && props.value.length),
      isShow = _useState[0],
      setIsShow = _useState[1];

  var clear = function clear() {
    if (props.onChange) props.onChange('');
    if (!showEverything) setIsShow(false);
  };

  var onChangeHandle = function onChangeHandle(event) {
    if (props.onChange) props.onChange(event.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$f.search, className, {
      'is-dark': isDark
    })
  }, isShow && /*#__PURE__*/React__default.createElement(TextField, _extends({}, props, {
    onChange: onChangeHandle,
    className: css$f.field
  })), isShow && Boolean(props.value && props.value.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.clear,
    onClick: clear
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close"
  })), isShow && !Boolean(props.value && props.value.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.clear
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-magnify"
  })), !isShow && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.button,
    onClick: function onClick() {
      return setIsShow(true);
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-magnify"
  })));
};

var css$g = {"field":"_styles-module__field__2jF9E","label":"_styles-module__label__iehEi","rcSelectLoadingIcon":"_styles-module__rcSelectLoadingIcon__VtsrG","rcSelectDropdownSlideUpIn":"_styles-module__rcSelectDropdownSlideUpIn__27wr-","rcSelectDropdownSlideUpOut":"_styles-module__rcSelectDropdownSlideUpOut__1QVN6","rcSelectDropdownSlideDownIn":"_styles-module__rcSelectDropdownSlideDownIn__1vYLX","rcSelectDropdownSlideDownOut":"_styles-module__rcSelectDropdownSlideDownOut__1-lNh","select-field":"_styles-module__select-field__1mUh_","select-field-selector":"_styles-module__select-field-selector__V9Ufm","select-field-arrow":"_styles-module__select-field-arrow__c4k8s","mdi":"_styles-module__mdi__2hNDK","select-field-selection-placeholder":"_styles-module__select-field-selection-placeholder__2Vdv0","select-field-selection-search":"_styles-module__select-field-selection-search__3GdNa","select-field-selection-search-input":"_styles-module__select-field-selection-search-input__3BOaB","select-field-selection-item":"_styles-module__select-field-selection-item__2uDu7","select-field-item-option-checkbox":"_styles-module__select-field-item-option-checkbox__2K_G1","select-field-selection-item-remove":"_styles-module__select-field-selection-item-remove__1k1IW","select-field-show-search":"_styles-module__select-field-show-search__3EVnU","select-field-show-arrow":"_styles-module__select-field-show-arrow__1xlmm","select-field-open":"_styles-module__select-field-open___jEZ1","select-field-multiple":"_styles-module__select-field-multiple__2YFSs","select-field-single":"_styles-module__select-field-single__1n3qF","select-field-clear":"_styles-module__select-field-clear__Mg5xq","select-field-item-option-state":"_styles-module__select-field-item-option-state__2yGkG","select-field-selection__choice-zoom":"_styles-module__select-field-selection__choice-zoom__3NUb5","select-field-selection__choice-zoom-appear":"_styles-module__select-field-selection__choice-zoom-appear__ZO73y","select-field-selection__choice-zoom-leave":"_styles-module__select-field-selection__choice-zoom-leave__2i54q","select-field-dropdown":"_styles-module__select-field-dropdown__14ngc"};

var allValue = 'all';

var SelectField = function SelectField(_ref) {
  var _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'left' : _ref$align,
      label = _ref.label,
      disabled = _ref.disabled,
      placeholder = _ref.placeholder,
      _ref$value = _ref.value,
      propValue = _ref$value === void 0 ? [] : _ref$value,
      className = _ref.className,
      mode = _ref.mode,
      onChange = _ref.onChange,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      _ref$showSearch = _ref.showSearch,
      showSearch = _ref$showSearch === void 0 ? true : _ref$showSearch,
      props = _objectWithoutPropertiesLoose(_ref, ["align", "label", "disabled", "placeholder", "value", "className", "mode", "onChange", "options", "showSearch"]);

  var onChangeHandle = function onChangeHandle(value) {
    if (value.indexOf(allValue) >= 0) if (value.length > options.length) value = [];else value = options.map(function (o) {
      return o.value;
    });
    if (onChange) onChange(value);
  };

  var onSelect = function onSelect() {};

  var onDeselect = function onDeselect() {};

  var renderOptions = function renderOptions() {
    return options.map(function (_ref2) {
      var value = _ref2.value,
          label = _ref2.label;
      return /*#__PURE__*/React__default.createElement(Select.Option, {
        key: value,
        value: value
      }, mode === 'multiple' && /*#__PURE__*/React__default.createElement(CheckboxField, {
        readOnly: true,
        className: "select-field-item-option-checkbox",
        value: propValue.indexOf(value) >= 0
      }), /*#__PURE__*/React__default.createElement("span", {
        className: "select-field-item-option-label"
      }, label));
    });
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$g.field, className, align, {
      disabled: disabled
    })
  }, /*#__PURE__*/React__default.createElement(Select__default, _extends({
    value: propValue,
    prefixCls: "select-field",
    multiple: mode === 'multiple',
    showArrow: true,
    showSearch: showSearch,
    onSelect: onSelect,
    onDeselect: onDeselect,
    placeholder: placeholder,
    onChange: onChangeHandle,
    inputIcon: /*#__PURE__*/React__default.createElement("span", {
      className: "mdi mdi-chevron-down"
    })
  }, props), options.length && mode === 'multiple' && /*#__PURE__*/React__default.createElement(Select.Option, {
    key: allValue,
    value: allValue
  }, /*#__PURE__*/React__default.createElement(CheckboxField, {
    readOnly: true,
    className: "select-field-item-option-checkbox",
    value: propValue.length === options.length
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "select-field-item-option-label"
  }, "Select all")), mode === 'multiple' ? /*#__PURE__*/React__default.createElement(Select.OptGroup, null, renderOptions()) : renderOptions()), label && /*#__PURE__*/React__default.createElement("label", {
    className: css$g.label
  }, label));
};

var css$h = {"field":"_styles-module__field__2_NXc","rcSliderTooltipZoomDownIn":"_styles-module__rcSliderTooltipZoomDownIn__2jvao","rcSliderTooltipZoomDownOut":"_styles-module__rcSliderTooltipZoomDownOut__2HgMB","slider":"_styles-module__slider__31Ylv","label":"_styles-module__label__Zo_r8","rc-slider":"_styles-module__rc-slider__1hLjI","rc-slider-rail":"_styles-module__rc-slider-rail__v9bxI","rc-slider-track":"_styles-module__rc-slider-track___3emJ","rc-slider-handle":"_styles-module__rc-slider-handle__12sQ3","rc-slider-handle-dragging":"_styles-module__rc-slider-handle-dragging__2u63-","rc-slider-handle-click-focused":"_styles-module__rc-slider-handle-click-focused__7xSSR","rc-slider-mark":"_styles-module__rc-slider-mark__1l2Qm","rc-slider-mark-text":"_styles-module__rc-slider-mark-text__2zf2c","rc-slider-mark-text-active":"_styles-module__rc-slider-mark-text-active__25tuh","rc-slider-step":"_styles-module__rc-slider-step__3wC_L","rc-slider-dot":"_styles-module__rc-slider-dot__17-SM","rc-slider-dot-active":"_styles-module__rc-slider-dot-active__1eLwY","rc-slider-dot-reverse":"_styles-module__rc-slider-dot-reverse__Ewb1d","rc-slider-disabled":"_styles-module__rc-slider-disabled__1YO43","rc-slider-vertical":"_styles-module__rc-slider-vertical__12Juq","rc-slider-tooltip-zoom-down-enter":"_styles-module__rc-slider-tooltip-zoom-down-enter__2a95b","rc-slider-tooltip-zoom-down-appear":"_styles-module__rc-slider-tooltip-zoom-down-appear__2wvsD","rc-slider-tooltip-zoom-down-leave":"_styles-module__rc-slider-tooltip-zoom-down-leave__3jMC3","rc-slider-tooltip-zoom-down-enter-active":"_styles-module__rc-slider-tooltip-zoom-down-enter-active__1M8Be","rc-slider-tooltip-zoom-down-appear-active":"_styles-module__rc-slider-tooltip-zoom-down-appear-active__3tu2z","rc-slider-tooltip-zoom-down-leave-active":"_styles-module__rc-slider-tooltip-zoom-down-leave-active__P9_lk","rc-slider-tooltip":"_styles-module__rc-slider-tooltip__1PZK2","rc-slider-tooltip-hidden":"_styles-module__rc-slider-tooltip-hidden__2CvyB","rc-slider-tooltip-placement-top":"_styles-module__rc-slider-tooltip-placement-top__qzmlA","rc-slider-tooltip-inner":"_styles-module__rc-slider-tooltip-inner__27Bp4","rc-slider-tooltip-arrow":"_styles-module__rc-slider-tooltip-arrow__35-HY"};

var CustomHandle = function CustomHandle(props) {
  var style = {
    left: props.offset + '%',
    transform: 'translateX(-50%)'
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: props.className,
    key: props.index,
    style: style,
    "data-value": props.value
  });
};

var SliderField = function SliderField(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      label = _ref.label,
      onChange = _ref.onChange,
      name = _ref.name,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'left' : _ref$align,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "disabled", "label", "onChange", "name", "align"]);

  var onChangeHandle = function onChangeHandle(value) {
    if (onChange) onChange({
      target: {
        value: value,
        name: name
      }
    });
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$h.field, className, align, {
      disabled: disabled
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$h.slider
  }, /*#__PURE__*/React__default.createElement(Slider, _extends({
    onChange: onChangeHandle,
    tipFormatter: function tipFormatter(value) {
      return "$" + value;
    },
    handle: CustomHandle
  }, props))), label && /*#__PURE__*/React__default.createElement("span", {
    className: css$h.label
  }, label));
};

var css$i = {"filters":"_styles-module__filters__kiZkv","select":"_styles-module__select__4Up3c","field":"_styles-module__field__3_9Ku"};

var StackFilters = function StackFilters(_ref) {
  var className = _ref.className,
      fields = _ref.fields,
      form = _ref.form,
      _onChange = _ref.onChange;
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$i.filters, className)
  }, Object.keys(fields).map(function (key) {
    switch (fields[key].type) {
      case 'select':
        return /*#__PURE__*/React__default.createElement(SelectField, {
          key: "select-" + key,
          align: "bottom",
          className: cx(css$i.field, css$i.select),
          onChange: function onChange(value) {
            return _onChange(key, value);
          },
          label: key,
          name: key,
          options: fields[key].options,
          value: Array.isArray(form[key]) ? form[key] : [form[key]]
        });

      case 'checkbox':
        return /*#__PURE__*/React__default.createElement(CheckboxField, {
          key: "checkbox-" + key,
          className: css$i.field,
          onChange: _onChange,
          label: key,
          name: key,
          value: form[key]
        });

      case 'slider':
        return /*#__PURE__*/React__default.createElement(SliderField, {
          key: "slider-" + key,
          className: css$i.field,
          onChange: _onChange,
          align: "right",
          label: key,
          name: key,
          value: form[key],
          step: null,
          min: fields[key].min,
          max: fields[key].max,
          marks: fields[key].options
        });

      default:
        return null;
    }
  }));
};

var css$j = {"field":"_styles-module__field__2DYF1","hidden":"_styles-module__hidden__3z5o2"};

var StretchTitleField = function StretchTitleField(_ref) {
  var value = _ref.value,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "placeholder", "className"]);

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$j.field, className)
  }, /*#__PURE__*/React__default.createElement("input", _extends({
    type: "text",
    placeholder: placeholder,
    value: value
  }, props)), /*#__PURE__*/React__default.createElement("div", {
    className: css$j.hidden
  }, value.length ? value : placeholder));
};

var css$k = {"tabs":"_styles-module__tabs__-hQvT","tab":"_styles-module__tab__2dsXN","soon":"_styles-module__soon__2_DJa"};

var Tabs = function Tabs(_ref) {
  var className = _ref.className,
      value = _ref.value,
      tabs = _ref.tabs,
      onChange = _ref.onChange;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$k.tabs, className)
  }, tabs.map(function (i, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: index,
      className: cx(css$k.tab, {
        active: value === i.value
      }),
      onClick: function onClick() {
        return onChange(i.value);
      }
    }, i.label, i.soon && /*#__PURE__*/React__default.createElement("span", {
      className: css$k.soon
    }, t('soon')));
  }));
};

var css$l = {"field":"_styles-module__field__3PgPN","textarea":"_styles-module__textarea__2Ok_K","label":"_styles-module__label__1qnsP","error":"_styles-module__error__1C6bH"};

var TextAreaField = function TextAreaField(_ref) {
  var label = _ref.label,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'normal' : _ref$size,
      _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? [] : _ref$errors,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "className", "size", "errors"]);

  var hasErrors = Boolean(errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$l.field, className, size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$l.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$l.textarea
  }, /*#__PURE__*/React__default.createElement("textarea", _extends({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$l.error
  }, errors.join(', '))));
};

var css$m = {"tooltip":"_style-module__tooltip__rE8Jn"};

var Tooltip = function Tooltip(_ref) {
  var children = _ref.children,
      overlayContent = _ref.overlayContent,
      _ref$arrowContent = _ref.arrowContent,
      arrowContent = _ref$arrowContent === void 0 ? null : _ref$arrowContent,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottomLeft' : _ref$placement,
      _ref$trigger = _ref.trigger,
      trigger = _ref$trigger === void 0 ? ['hover'] : _ref$trigger,
      _ref$overlayStyle = _ref.overlayStyle,
      overlayStyle = _ref$overlayStyle === void 0 ? {
    'pointer-events': 'none'
  } : _ref$overlayStyle,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "overlayContent", "arrowContent", "placement", "trigger", "overlayStyle"]);

  return /*#__PURE__*/React__default.createElement(RcTooltip, _extends({
    overlayStyle: overlayStyle,
    arrowContent: arrowContent,
    placement: placement,
    trigger: trigger,
    overlay: /*#__PURE__*/React__default.createElement("div", {
      className: css$m.tooltip
    }, overlayContent)
  }, props), children);
};

var css$n = {"switcher":"_styles-module__switcher__3NMzC"};

var ViewSwitcher = function ViewSwitcher(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? 'grid' : _ref$value,
      onChange = _ref.onChange,
      className = _ref.className;

  var _useState = React.useState(value),
      stateValue = _useState[0],
      setStateValue = _useState[1];

  React.useEffect(function () {
    if (value !== stateValue) setStateValue(value);
  }, [value]);

  var toggleValue = function toggleValue() {
    var newValue = stateValue === 'grid' ? 'list' : 'grid';
    setStateValue(newValue);
    if (onChange) onChange(newValue);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$n.switcher, stateValue, className),
    onClick: toggleValue
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-view-grid"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-view-list"
  }));
};

var Yield = function Yield(_ref) {
  var name = _ref.name,
      className = _ref.className,
      children = _ref.children;
  if (!name) return null;
  if (children) return /*#__PURE__*/React__default.createElement(reactPortal.Portal, {
    node: document && document.getElementById(name)
  }, children);
  return /*#__PURE__*/React__default.createElement("div", {
    className: className,
    id: name
  });
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var css$o = {"table":"_styles-module__table__3tMWP"};

var Table = function Table(_ref) {
  var data = _ref.data;
  var captions = data[0],
      rows = data.slice(1);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$o.table
  }, /*#__PURE__*/React__default.createElement("table", null, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, captions.map(function (caption) {
    return /*#__PURE__*/React__default.createElement("th", {
      key: caption
    }, caption);
  }))), /*#__PURE__*/React__default.createElement("tbody", null, rows.map(function (row, index) {
    return /*#__PURE__*/React__default.createElement("tr", {
      key: index
    }, row.map(function (cell, i) {
      return /*#__PURE__*/React__default.createElement("td", {
        key: i
      }, cell);
    }));
  }))));
};

var instance = axios.create({
  baseURL: config.API_URL,
  crossDomain: true
});
instance.interceptors.request.use(function (config) {
  var token = localStorage.getItem('token');
  config.headers.Authorization = token ? "Bearer " + token : '';
  return config;
});
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (lodashEs.get(error, 'response.status', null) === 401) {
    return Promise.reject(error.response);
  } else if (lodashEs.get(error, 'response.status', null) === 400) {
    return Promise.reject(error.response);
  } else {
    return Promise.reject(error);
  }
});

var actionsTypes = {
  FETCH: 'stacks/attachments/FETCH',
  FETCH_SUCCESS: 'stacks/attachments/FETCH_SUCCESS',
  FETCH_FAIL: 'stacks/attachments/FETCH_FAIL'
};

var initialState = {
  data: {},
  errors: {},
  requestStatus: null
};
var reducer = function reducer(state, action) {
  var _extends2, _extends3, _extends4, _extends5, _extends6, _extends7;

  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case actionsTypes.FETCH:
      return _extends({}, state, {
        data: _extends({}, state.data, (_extends3 = {}, _extends3[action.meta.frameId] = _extends({}, state.data[action.meta.frameId], (_extends2 = {}, _extends2[action.meta.id] = _extends({}, state.data[action.meta.frameId] ? state.data[action.meta.frameId][action.meta.id] : {}, {
          loading: true,
          requestStatus: null,
          error: null
        }), _extends2)), _extends3))
      });

    case actionsTypes.FETCH_SUCCESS:
      return _extends({}, state, {
        data: _extends({}, state.data, (_extends5 = {}, _extends5[action.meta.frameId] = _extends({}, state.data[action.meta.frameId], (_extends4 = {}, _extends4[action.meta.id] = _extends({}, action.payload, {
          loading: false
        }), _extends4)), _extends5))
      });

    case actionsTypes.FETCH_FAIL:
      return _extends({}, state, {
        data: _extends({}, state.data, (_extends7 = {}, _extends7[action.meta.frameId] = _extends({}, state.data[action.meta.frameId], (_extends6 = {}, _extends6[action.meta.id] = {
          error: action.payload.error,
          requestStatus: action.payload.requestStatus,
          loading: false
        }, _extends6)), _extends7))
      });

    default:
      return state;
  }
};
var StateContext = React.createContext();
var StateProvider = function StateProvider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement(StateContext.Provider, {
    value: React.useReducer(reducer, initialState)
  }, children);
};
var useStateValue = function useStateValue() {
  return React.useContext(StateContext);
};

var actions = (function () {
  var _useStateValue = useStateValue(),
      dispatch = _useStateValue[1];

  var fetchAttachment = function fetchAttachment(stack, frameId, id, onSuccess) {
    try {
      dispatch({
        type: actionsTypes.FETCH,
        meta: {
          frameId: frameId,
          id: id
        }
      });

      var _temp2 = _catch(function () {
        return Promise.resolve(api.get(config.STACK_ATTACHMENT(stack, frameId, id))).then(function (request) {
          dispatch({
            type: actionsTypes.FETCH_SUCCESS,
            meta: {
              frameId: frameId,
              id: id
            },
            payload: request.data.attachment
          });
          if (onSuccess) onSuccess();
        });
      }, function (e) {
        var error = 'Unknown error';

        try {
          error = JSON.parse(lodashEs.get(e, 'request.response')).message;
        } catch (e) {
          console.log(error);
        }

        dispatch({
          type: actionsTypes.FETCH_FAIL,
          meta: {
            frameId: frameId,
            id: id
          },
          payload: {
            error: error
          }
        });
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    fetchAttachment: fetchAttachment
  };
});

var css$p = {"attachment":"_styles-module__attachment__3NILI","loading-pulse":"_styles-module__loading-pulse__IhCO3","view":"_styles-module__view__3UWqG","text":"_styles-module__text__MOcaD","message":"_styles-module__message__1IDQc"};

var base64ToJSON = function base64ToJSON(base64) {
  var parsedJSON;

  try {
    parsedJSON = JSON.parse(atob(base64));
  } catch (e) {
    console.log(e);
  }

  return parsedJSON;
};

var base64ImagePrefixes = {
  'image/svg+xml': 'data:image/svg+xml;charset=utf-8;',
  'image/png': 'data:image/png;charset=utf-8;',
  'image/jpeg': 'data:image/jpeg;charset=utf-8;'
};

var isImageType = function isImageType(type) {
  return /^image/.test(type);
};

var Attachment = function Attachment(_ref) {
  var id = _ref.id,
      className = _ref.className,
      frameId = _ref.frameId,
      isList = _ref.isList,
      withLoader = _ref.withLoader,
      stack = _ref.stack;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _actions = actions(),
      fetchAttachment = _actions.fetchAttachment;

  var _useStateValue = useStateValue(),
      data = _useStateValue[0].data;

  var _get = lodashEs.get(data, frameId + "." + id, {}),
      loading = _get.loading,
      error = _get.error,
      requestStatus = _get.requestStatus,
      attachment = _objectWithoutPropertiesLoose(_get, ["loading", "error", "requestStatus"]);

  var _useState = React.useState(1),
      tableScale = _useState[0],
      setTableScale = _useState[1];

  var _useState2 = React.useState(false),
      loadingFullAttachment = _useState2[0],
      setLoadingFullAttachment = _useState2[1];

  var _useState3 = React.useState(null),
      fullAttachment = _useState3[0],
      setFullAttachment = _useState3[1];

  var viewRef = React.useRef(null);
  var prevAttachment = usePrevious(attachment);
  React.useEffect(function () {
    if (window && isList) window.addEventListener('resize', onResizeCard);
    return function () {
      if (window && isList) window.removeEventListener('resize', onResizeCard);
    };
  }, []);

  var fetchFullAttachment = function fetchFullAttachment() {
    try {
      var _temp3 = function _temp3() {
        setLoadingFullAttachment(false);
      };

      setLoadingFullAttachment(true);

      var _temp4 = _catch(function () {
        var url = config.STACK_ATTACHMENT(stack, frameId, id) + '?download=true';
        return Promise.resolve(instance.get(url)).then(function (_ref2) {
          var data = _ref2.data;
          setFullAttachment(data.attachment);
        });
      }, function (e) {
        console.log(e);
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  React.useEffect(function () {
    if (!isList && attachment && !lodashEs.isEqual(prevAttachment, attachment) && attachment.preview && isImageType(attachment['content_type'])) {
      fetchFullAttachment();
    }
  }, [data]);
  React.useEffect(function () {
    if (!isList && typeof id === 'number' && frameId && (!attachment.data && !error || (attachment === null || attachment === void 0 ? void 0 : attachment.index) !== id)) {
      fetchAttachment(stack, frameId, id);
    }
  }, [id, frameId]);

  var _useIntersectionObser = useIntersectionObserver(function () {
    if (isList && !loading && (!attachment.data && !error || attachment.data && attachment.index !== id)) fetchAttachment(stack, frameId, id);
  }, {}, [id, frameId, data]),
      ref = _useIntersectionObser[0];

  React.useEffect(function () {
    if (attachment && attachment['application'] === 'bokeh' && Bokeh) {
      var json = base64ToJSON(attachment.data);
      if (json && document.querySelector("#bokeh-" + frameId)) Bokeh.embed.embed_item(json, "bokeh-" + frameId);
    }

    if (isList) setTimeout(function () {
      return onResizeCard();
    }, 10);
  }, [data]);

  var onResizeCard = function onResizeCard() {
    if (ref.current && viewRef.current) {
      var containerWidth = ref.current.offsetWidth;
      var viewWidth = viewRef.current.offsetWidth / tableScale;
      var newScale = containerWidth / viewWidth;
      if (newScale > 1) newScale = 1;
      setTableScale(newScale);
    }
  };

  var renderImage = function renderImage() {
    if (!attachment.preview) return /*#__PURE__*/React__default.createElement("img", {
      src: base64ImagePrefixes[attachment['content_type']] + "base64," + attachment.data,
      alt: ""
    });else if (fullAttachment) {
      if (fullAttachment['download_url']) {
        return /*#__PURE__*/React__default.createElement("img", {
          src: fullAttachment['download_url'],
          alt: ""
        });
      } else return /*#__PURE__*/React__default.createElement("img", {
        src: base64ImagePrefixes[attachment['content_type']] + "base64," + attachment.data,
        alt: ""
      });
    }
    return null;
  };

  var renderCSV = function renderCSV() {
    var decodeCSV = unicodeBase64Decode(attachment.data);

    if (decodeCSV) {
      var _data = CSV.parse(decodeCSV);

      if (Array.isArray(_data) && _data.length) return /*#__PURE__*/React__default.createElement(Table, {
        data: _data
      });
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.text
    }, t('notSupportedAttachment'));
  };

  var renderPlotly = function renderPlotly() {
    var json = base64ToJSON(attachment.data);
    if (!json) return null;
    json.layout.width = '100%';
    json.layout.margin = 0;
    json.layout.autosize = true;
    json.config = {
      responsive: true
    };
    return /*#__PURE__*/React__default.createElement(Plot, _extends({}, json, {
      style: {
        width: '100%',
        height: '100%'
      },
      useResizeHandler: true
    }));
  };

  var renderBokeh = function renderBokeh() {
    return /*#__PURE__*/React__default.createElement("div", {
      id: "bokeh-" + frameId
    });
  };

  var renderAttachment = function renderAttachment() {
    if (loading) return null;
    if (requestStatus === 404 && isList) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.message
    }, t('notFound'));
    if (requestStatus === 404 && !isList) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.text
    }, t('noPreview'));
    if (attachment.preview && isList && isImageType(attachment['content_type'])) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.message
    }, t('noPreview'));

    switch (true) {
      case attachment['content_type'] === 'image/svg+xml':
      case attachment['content_type'] === 'image/png':
      case attachment['content_type'] === 'image/jpeg':
        return renderImage();

      case attachment['content_type'] === 'text/csv':
        return renderCSV();

      case attachment['application'] === 'plotly':
        return renderPlotly();

      case attachment['application'] === 'bokeh':
        return renderBokeh();

      case undefined:
        return null;

      default:
        return /*#__PURE__*/React__default.createElement("div", {
          className: isList ? css$p.message : css$p.text
        }, t('notSupportedAttachment'));
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$p.attachment, className, {
      'is-list': isList,
      loading: loading && withLoader || loadingFullAttachment
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: viewRef,
    className: cx(css$p.view, {
      'table': attachment && attachment.data && attachment['content_type'] === 'text/csv',
      'bokeh': attachment && attachment.data && attachment['application'] === 'bokeh'
    }),
    style: attachment && attachment['content_type'] === 'text/csv' ? {
      transform: "scale(" + tableScale + ")"
    } : {}
  }, renderAttachment()));
};

var css$q = {"item":"_styles-module__item__fLtf5","preview":"_styles-module__preview__2dbXz","previewWrap":"_styles-module__previewWrap__2tToy","emptyMessage":"_styles-module__emptyMessage__3HPC2","attachment":"_styles-module__attachment__2ggOS","section":"_styles-module__section__1ugjv","content":"_styles-module__content__2S1Sc","name":"_styles-module__name__147V3","by":"_styles-module__by__3t2iA","permissions":"_styles-module__permissions__2SUP0","dropdown":"_styles-module__dropdown__35FwM","preview-stack-pulse":"_styles-module__preview-stack-pulse__YESUl"};

var Item = function Item(_ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'div' : _ref$Component,
      onClick = _ref.onClick,
      data = _ref.data,
      deleteAction = _ref.deleteAction,
      otherOwner = _ref.otherOwner,
      rest = _objectWithoutPropertiesLoose(_ref, ["Component", "onClick", "data", "deleteAction", "otherOwner"]);

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var ref = React.useRef(null);
  return /*#__PURE__*/React__default.createElement(Component, _extends({
    className: css$q.item,
    ref: ref,
    onClick: onClick
  }, rest), /*#__PURE__*/React__default.createElement("div", {
    className: css$q.previewWrap
  }, data.head ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$q.attachment,
    isList: true,
    withLoader: true,
    stack: data.user + "/" + data.name,
    frameId: data.head,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$q.emptyMessage
  }, t('emptyStack'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$q.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$q.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$q.name
  }, data.name, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), otherOwner && /*#__PURE__*/React__default.createElement("div", {
    className: css$q.by
  }, t('by'), " ", data.user)), deleteAction && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$q.dropdown,
    items: [{
      title: t('delete'),
      onClick: function onClick() {
        return deleteAction(data.name);
      }
    }]
  })));
};

var css$r = {"howto":"_styles-module__howto__2kGrG","tabs":"_styles-module__tabs__RLKw7","description":"_styles-module__description__3Ul2-","code":"_styles-module__code__11v2r","footer":"_styles-module__footer__nTy2P"};

var reportPlotPythonCode = "import matplotlib.pyplot as plt\nfrom dstack import push_frame\n\nfig = plt.figure()\nplt.plot([1, 2, 3, 4], [1, 4, 9, 16])\n\npush_frame(\"simple\", fig, \"My first plot\")";
var installRPackageCode = 'install.packages("dstack")';
var reportPlotRCode = "library(ggplot2)\nlibrary(dstack)\n\ndf <- data.frame(x = c(1, 2, 3, 4), y = c(1, 4, 9, 16))\nimage <- ggplot(data = df, aes(x = x, y = y)) + geom_line()\n\npush_frame(\"simple\", image, \"My first plot\")";

var HowTo = function HowTo(_ref) {
  var user = _ref.user,
      token = _ref.token;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(1),
      activeCodeTab = _useState[0],
      setActiveCodeTab = _useState[1];

  var _useState2 = React.useState(1),
      activePlatformTab = _useState2[0],
      setActivePlatformTab = _useState2[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$r.howto
  }, /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
    value: activeCodeTab,
    onChange: setActiveCodeTab,
    tabs: [{
      label: t('python'),
      value: 1
    }, {
      label: t('r'),
      value: 2
    }]
  }), activeCodeTab === 1 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
    value: activePlatformTab,
    onChange: setActivePlatformTab,
    tabs: [{
      label: t('pip'),
      value: 1
    }, {
      label: t('conda'),
      value: 2
    }]
  }), activePlatformTab === 1 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, config$1.CONFIGURE_PYTHON_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "python"
  }, reportPlotPythonCode)), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, installRPackageCode), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, config$1.CONFIGURE_R_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, reportPlotRCode)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.footer,
    dangerouslySetInnerHTML: {
      __html: t('notClearCheckTheDocks', {
        href: config$1.DOCS_URL
      })
    }
  }));
};

var css$s = {"list":"_styles-module__list__3CcWo","title":"_styles-module__title__2HbVV","side":"_styles-module__side__I1N48","message":"_styles-module__message__3XJKG","text":"_styles-module__text__1_wO5","grid":"_styles-module__grid__1BjLa","search":"_styles-module__search__3VlZv","mobileSearch":"_styles-module__mobileSearch__IxVfV","modal":"_styles-module__modal__1BJIQ","description":"_styles-module__description__1U-iN","buttons":"_styles-module__buttons__19NkE","button":"_styles-module__button__3jLaw"};

var List = function List(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      loading = _ref.loading,
      deleteStack = _ref.deleteStack,
      currentUser = _ref.currentUser,
      user = _ref.user,
      currentUserToken = _ref.currentUserToken,
      renderSideTitle = _ref.renderSideTitle;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(null),
      deletingStack = _useState[0],
      setDeletingStack = _useState[1];

  var _useState2 = React.useState(false),
      isShowWelcomeModal = _useState2[0],
      setIsShowWelcomeModal = _useState2[1];

  var _useState3 = React.useState(false),
      isShowHowToModal = _useState3[0],
      setIsShowHowToModal = _useState3[1];

  var _useState4 = React.useState(''),
      search = _useState4[0],
      setSearch = _useState4[1];

  var isInitialMount = React.useRef(true);

  var showWelcomeModal = function showWelcomeModal() {
    return setIsShowWelcomeModal(true);
  };

  var onChangeSearch = function onChangeSearch(value) {
    return setSearch(value);
  };

  var hideWelcomeModal = function hideWelcomeModal() {
    localStorage.setItem('welcome-modal-is-showing', true);
    setIsShowWelcomeModal(false);
  };

  React.useEffect(function () {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!localStorage.getItem('welcome-modal-is-showing') && !loading && !data.length) showWelcomeModal();
    }
  }, [data]);

  var showHowToModal = function showHowToModal(event) {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  var hideHowToModal = function hideHowToModal() {
    return setIsShowHowToModal(false);
  };

  var deleteItem = function deleteItem() {
    deleteStack(deletingStack);
    hideDeleteConfirmation();
  };

  var showDeleteConfirmation = function showDeleteConfirmation(name) {
    return setDeletingStack(name);
  };

  var hideDeleteConfirmation = function hideDeleteConfirmation() {
    return setDeletingStack(null);
  };

  var getItems = function getItems() {
    var items = [];

    if (data && data.length) {
      if (search.length) items = data.filter(function (i) {
        return i.name.indexOf(search) >= 0;
      });else items = data;
    }

    return items;
  };

  var items = getItems();
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$s.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$s.search,
    placeholder: t('findStack'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.title
  }, currentUser === user ? t('stacks') : t('stacksOf', {
    name: user
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.side
  }, renderSideTitle && renderSideTitle())), loading && !Boolean(data.length) && /*#__PURE__*/React__default.createElement(Loader, null), !loading && !data.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: user
  })), !loading && !Boolean(data.length) && currentUser === user && /*#__PURE__*/React__default.createElement(HowTo, {
    user: currentUser,
    token: currentUserToken
  }), Boolean(data.length && items.length) && currentUser === user && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.text
  }, t('youHaveStacks', {
    count: data.length
  }), ' ', /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('seeHowToGuide')), "."), Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$s.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), Boolean(data.length && items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.grid
  }, items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement(Item, {
      Component: reactRouterDom.Link,
      key: index,
      data: item,
      otherOwner: user !== item.user,
      to: "/" + item.user + "/" + item.name,
      deleteAction: currentUser === item.user && showDeleteConfirmation
    });
  })), Boolean(data.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(deletingStack),
    onClose: hideDeleteConfirmation,
    size: "confirmation",
    title: t('deleteStack'),
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.description
  }, t('areYouSureYouWantToDelete', {
    name: deletingStack
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: hideDeleteConfirmation,
    className: css$s.button
  }, t('cancel')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: deleteItem,
    className: css$s.button
  }, t('deleteStack')))), currentUser === user && /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowWelcomeModal,
    onClose: hideWelcomeModal,
    size: "small",
    title: t('welcomeToDStack') + "\uD83D\uDC4B",
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.description
  }, t('yourEmailWasSuccessfullyConfirmed')), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: hideWelcomeModal,
    className: css$s.button
  }, t('getStarted')))), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowHowToModal,
    withCloseButton: true,
    onClose: hideHowToModal,
    size: "big",
    title: t('howToConnectYourDataWithDStack'),
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement(HowTo, {
    user: currentUser,
    token: currentUserToken,
    modalMode: true
  })));
};

var pullPythonCode = function pullPythonCode(data) {
  var a = ["'/" + data.stack + "'"];
  var params = Object.keys(data.params);

  if (params.length > 0) {
    var p = [];
    params.forEach(function (key) {
      if (lodashEs.isString(data.params[key])) p.push("'" + key + "': '" + data.params[key] + "'");else p.push("'" + key + "': " + data.params[key]);
    });
    a.push('params={' + p.join(', ') + '}');
  }

  return "import pandas as pd\nfrom dstack import pull\n\ndf = pd.read_csv(pull(" + a.join(', ') + "))";
};
var pullRCode = function pullRCode(data) {
  var a = ["\"/" + data.stack + "\""];
  var params = Object.keys(data.params);

  if (params.length > 0) {
    params.forEach(function (key) {
      if (lodashEs.isString(data.params[key])) a.push("\"" + key + "\" = \"" + data.params[key] + "\"");else a.push("\"" + key + "\" = " + data.params[key]);
    });
  }

  return "library(dstack)\n\ndf <- read.csv(pull(" + a.join(', ') + "))";
};

var HowTo$1 = function HowTo(_ref) {
  var modalMode = _ref.modalMode,
      user = _ref.user,
      token = _ref.token,
      data = _ref.data;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(1),
      activeCodeTab = _useState[0],
      setActiveCodeTab = _useState[1];

  var _useState2 = React.useState(1),
      activePlatformTab = _useState2[0],
      setActivePlatformTab = _useState2[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$r.howto
  }, !modalMode && /*#__PURE__*/React__default.createElement("div", {
    className: css$r.title
  }, t('howToFetchDataUsingTheAPI')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
    value: activeCodeTab,
    onChange: setActiveCodeTab,
    tabs: [{
      label: t('python'),
      value: 1
    }, {
      label: t('r'),
      value: 2
    }]
  }), activeCodeTab === 1 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
    value: activePlatformTab,
    onChange: setActivePlatformTab,
    tabs: [{
      label: t('pip'),
      value: 1
    }, {
      label: t('conda'),
      value: 2
    }]
  }), activePlatformTab === 1 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, config$1.CONFIGURE_PYTHON_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "python"
  }, pullPythonCode(data))), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, "install.packages(\"dstack\")"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, config$1.CONFIGURE_R_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, pullRCode(data))), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.footer,
    dangerouslySetInnerHTML: {
      __html: t('notClearCheckTheDocks_2', {
        href: config$1.DOCS_URL
      })
    }
  }));
};

var css$t = {"frames":"_styles-module__frames__3D3R4","frames-dropdown":"_styles-module__frames-dropdown__3hapH","button":"_styles-module__button__Tn4o_","name":"_styles-module__name__YzOn7","label":"_styles-module__label__Hg7hs","dropdown":"_styles-module__dropdown__16pcp","item":"_styles-module__item__1q46l","mark":"_styles-module__mark__1h8Eq","info":"_styles-module__info__2BnTD","modal":"_styles-module__modal__pk61B","description":"_styles-module__description__2GOOp","buttons":"_styles-module__buttons__3Ml-A"};

var getFrameName = function getFrameName(frame) {
  return moment(frame.timestamp).format('D MMM YYYY h:mm a');
};

var Frames = function Frames(_ref) {
  var frame = _ref.frame,
      frames = _ref.frames,
      headId = _ref.headId,
      onChange = _ref.onChange,
      onMarkAsHead = _ref.onMarkAsHead,
      className = _ref.className;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(false),
      isShowDropdown = _useState[0],
      setIsShowDropdown = _useState[1];

  var toggleDropdown = function toggleDropdown() {
    return setIsShowDropdown(!isShowDropdown);
  };

  var _useState2 = React.useState(null),
      frameForMarkingAsHead = _useState2[0],
      setFrameForMarkingAsHead = _useState2[1];

  var dropdownRef = React.useRef(null);
  useOnClickOutside(dropdownRef, function () {
    return isShowDropdown && toggleDropdown();
  });
  if (!frames.length) return null;
  var activeFrame = frames.find(function (f) {
    return f.id === frame;
  });

  var onClickItem = function onClickItem(frameId) {
    return function () {
      toggleDropdown();
      if (frame !== frameId && onChange) onChange(frameId);
    };
  };

  var onClickMarkAsHead = function onClickMarkAsHead(frameId) {
    return function (event) {
      event.stopPropagation();
      setFrameForMarkingAsHead(frameId);
      toggleDropdown();
    };
  };

  var hideConfirmation = function hideConfirmation() {
    return setFrameForMarkingAsHead(null);
  };

  var confirmMarkFrameAsHead = function confirmMarkFrameAsHead() {
    if (onMarkAsHead) onMarkAsHead(frameForMarkingAsHead.id);
    setFrameForMarkingAsHead(null);
  };

  if (!activeFrame) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.frames, className),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t['frames-dropdown']),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.button,
    onClick: toggleDropdown
  }, /*#__PURE__*/React__default.createElement("span", {
    className: css$t.name
  }, getFrameName(activeFrame)), headId === activeFrame.id && /*#__PURE__*/React__default.createElement("span", {
    className: css$t.label
  }, t('head')), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.dropdown, {
      show: isShowDropdown
    })
  }, frames.map(function (f) {
    return /*#__PURE__*/React__default.createElement(Tooltip, {
      key: f.id,
      placement: "rightTop",
      trigger: Boolean(f.description) ? ['hover'] : [],
      align: {
        offset: [-20, -20]
      },
      onClick: onClickItem(f.id),
      overlayContent: f.description
    }, /*#__PURE__*/React__default.createElement("div", {
      className: css$t.item
    }, /*#__PURE__*/React__default.createElement("span", {
      className: css$t.name
    }, getFrameName(f)), headId === f.id && /*#__PURE__*/React__default.createElement("span", {
      className: css$t.label
    }, t('head')), headId !== f.id && /*#__PURE__*/React__default.createElement("div", {
      className: css$t.mark,
      onClick: onClickMarkAsHead(f)
    }, t('markAsHead'))));
  }))), activeFrame && activeFrame.description && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: activeFrame.description
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.info)
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-variant"
  }))), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(frameForMarkingAsHead),
    onClose: hideConfirmation,
    size: "confirmation",
    title: t('changeHeadRevision'),
    className: css$t.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('areYouSureYouWantToChangeTheCurrentHeadRevisionToByName', {
    frame: frameForMarkingAsHead && getFrameName(frameForMarkingAsHead)
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: confirmMarkFrameAsHead,
    className: css$t.button
  }, t('yesChangeHead')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: hideConfirmation,
    className: css$t.button
  }, t('cancel')))));
};

var css$u = {"loader":"_styles-module__loader__2wNmt","title":"_styles-module__title__1Ms-2","stacks-pulse":"_styles-module__stacks-pulse__FjfKI","label":"_styles-module__label__1rFaq","description":"_styles-module__description__1Rg_O","diagram":"_styles-module__diagram__2Aj7C"};

var Loader$1 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$u.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$u.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.label
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.diagram
  }));
};

var css$v = {"details":"_styles-module__details__3iAZb","section":"_styles-module__section___r9FQ","header":"_styles-module__header__2kekg","title":"_styles-module__title__1zGvd","permissions":"_styles-module__permissions__3ydGO","copy":"_styles-module__copy__2ikHm","link":"_styles-module__link__21w9U","dropdown":"_styles-module__dropdown__3axDI","attachment-head":"_styles-module__attachment-head__282UU","description":"_styles-module__description__Y6gJz","label":"_styles-module__label__2FemD","label-tooltip":"_styles-module__label-tooltip__2Oe5S","actions":"_styles-module__actions__sZkKa","size":"_styles-module__size__Ja107","revisions":"_styles-module__revisions__bLqAO","filters":"_styles-module__filters__1-hdZ","attachment":"_styles-module__attachment__3IGZo","sidebar":"_styles-module__sidebar__U0_wY","modal":"_styles-module__modal__2TdJX","buttons":"_styles-module__buttons__RhHmq","button":"_styles-module__button__26mqa"};

var Details = function Details(_ref) {
  var currentFrameId = _ref.currentFrameId,
      headId = _ref.headId,
      onChangeHeadFrame = _ref.onChangeHeadFrame,
      attachmentIndex = _ref.attachmentIndex,
      onChangeAttachmentIndex = _ref.onChangeAttachmentIndex,
      downloadAttachment = _ref.downloadAttachment,
      onChangeFrame = _ref.onChangeFrame,
      data = _ref.data,
      frame = _ref.frame,
      loading = _ref.loading,
      currentUser = _ref.currentUser,
      currentUserToken = _ref.currentUserToken,
      toggleUpload = _ref.toggleUpload,
      backUrl = _ref.backUrl,
      user = _ref.user,
      stack = _ref.stack;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var didMountRef = React.useRef(false);

  var _useForm = useForm({}),
      form = _useForm.form,
      setForm = _useForm.setForm,
      onChange = _useForm.onChange;

  var _useState = React.useState({}),
      fields = _useState[0],
      setFields = _useState[1];

  var prevFrame = hooks.usePrevious(frame);

  var _useState2 = React.useState(false),
      isShowHowToModal = _useState2[0],
      setIsShowHowToModal = _useState2[1];

  var showHowToModal = function showHowToModal(event) {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  var hideHowToModal = function hideHowToModal() {
    return setIsShowHowToModal(false);
  };

  React.useEffect(function () {
    if ((!lodashEs.isEqual(prevFrame, frame) || !didMountRef.current) && frame) parseParams();
  }, [frame]);

  var findAttach = function findAttach(form, attachmentIndex) {
    var attachments = lodashEs.get(frame, 'attachments');
    var fields = Object.keys(form);
    if (!attachments) return;

    if (fields.length) {
      attachments.some(function (attach, index) {
        var valid = true;
        fields.forEach(function (key) {
          if (!attach.params || !lodashEs.isEqual(attach.params[key], form[key])) valid = false;
        });
        if (valid && !(attachmentIndex === undefined && index === 0)) onChangeAttachmentIndex(index);
        return valid;
      });
    }
  };

  var findAttachDebounce = React.useCallback(lodashEs.debounce(findAttach, 300), [data, frame]);
  React.useEffect(function () {
    if (didMountRef.current) findAttachDebounce(form, attachmentIndex);else didMountRef.current = true;
  }, [form]);

  var parseParams = function parseParams() {
    var attachments = lodashEs.get(frame, 'attachments');
    if (!attachments || !attachments.length) return;
    var fields = parseStackParams(attachments);
    setFields(fields);

    if (attachmentIndex !== undefined) {
      if (attachments[attachmentIndex]) setForm(attachments[attachmentIndex].params);
    } else setForm(attachments[0].params);
  };

  var renderFields = function renderFields() {
    if (!Object.keys(fields).length) return null;
    var hasSelectField = Object.keys(fields).some(function (key) {
      return fields[key].type === 'select';
    });
    return /*#__PURE__*/React__default.createElement(StackFilters, {
      fields: fields,
      form: form,
      onChange: onChange,
      className: cx(css$v.filters, {
        'with-select': hasSelectField
      })
    });
  };

  var onClickDownloadAttachment = function onClickDownloadAttachment(event) {
    event.preventDefault();
    downloadAttachment();
  };

  var attachment = lodashEs.get(frame, "attachments[" + attachmentIndex + "]");
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$1, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$v.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: reactRouterDom.Link,
    to: backUrl
  }, currentUser === user ? t('backToMyStacks') : t('backToStacksOF', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("section", {
    className: css$v.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.title
  }, data.name, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), data && data.user === currentUser && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$v.dropdown,
    items: [{
      title: t('upload'),
      onClick: toggleUpload
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$v['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  })))), /*#__PURE__*/React__default.createElement(Frames, {
    frames: lodashEs.get(data, 'frames', []),
    frame: currentFrameId,
    headId: headId,
    onMarkAsHead: onChangeHeadFrame,
    onChange: onChangeFrame,
    className: css$v.revisions
  }), renderFields(), attachment && /*#__PURE__*/React__default.createElement("div", {
    className: css$v['attachment-head']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.description
  }, attachment.description && /*#__PURE__*/React__default.createElement(MarkdownRender, {
    source: attachment.description
  })), attachment['content_type'] === 'text/csv' && /*#__PURE__*/React__default.createElement("div", {
    className: css$v.actions
  }, attachment.preview && /*#__PURE__*/React__default.createElement("div", {
    className: css$v.label
  }, t('preview'), /*#__PURE__*/React__default.createElement("div", {
    className: css$v['label-tooltip']
  }, t('theTableBelowShowsOnlyAPreview'))), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('useThisStackViaAPI')), /*#__PURE__*/React__default.createElement("span", null, t('or')), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: onClickDownloadAttachment
  }, t('download')), attachment.length && /*#__PURE__*/React__default.createElement("span", {
    className: css$v.size
  }, "(", formatBytes(attachment.length), ")"))), frame && /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$v.attachment,
    withLoader: true,
    stack: user + "/" + stack,
    frameId: frame.id,
    id: attachmentIndex || 0
  })), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowHowToModal,
    withCloseButton: true,
    onClose: hideHowToModal,
    size: "big",
    title: t('howToFetchDataUsingTheAPI'),
    className: css$v.modal
  }, /*#__PURE__*/React__default.createElement(HowTo$1, {
    user: currentUser,
    token: currentUserToken,
    data: {
      stack: user + "/" + stack,
      params: form
    },
    modalMode: true
  })));
};

var css$w = {"item":"_styles-module__item__3urCL","preview":"_styles-module__preview__cxR4e","label":"_styles-module__label__tCzQe","previewWrap":"_styles-module__previewWrap__15fuU","emptyMessage":"_styles-module__emptyMessage__2pDKf","attachment":"_styles-module__attachment__35KB8","section":"_styles-module__section__LeHWu","content":"_styles-module__content__Bgbe4","name":"_styles-module__name__2PrtI","by":"_styles-module__by__1_qsJ","permissions":"_styles-module__permissions__3ZdE1","dropdown":"_styles-module__dropdown__vK4SD","preview-stack-pulse":"_styles-module__preview-stack-pulse__3NFJT"};

var Item$1 = function Item(_ref) {
  var dashboard = _ref.dashboard,
      deleteDashboard = _ref.deleteDashboard,
      user = _ref.user;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var ref = React.useRef(null);
  var hasStacks = dashboard.cards && Boolean(dashboard.cards.length);
  var card = dashboard.cards.find(function (c) {
    return lodashEs.get(c, 'head.id');
  });

  var onClickDelete = function onClickDelete() {
    deleteDashboard({
      user: user,
      id: dashboard.id
    });
  };

  var isShowDropdown = Boolean(deleteDashboard);
  return /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: routes.dashboardsDetails(user, dashboard.id),
    className: css$w.item,
    ref: ref
  }, Boolean(dashboard.cards.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$w.label
  }, t('stacksWithCount', {
    count: dashboard.cards.length
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.previewWrap
  }, hasStacks ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$w.attachment,
    isList: true,
    withLoader: true,
    frameId: card.head.id,
    stack: card.stack,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$w.emptyMessage
  }, t('emptyDashboard'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.name
  }, dashboard.title, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (dashboard["private"] ? '' : '-open')
  })), user !== dashboard.user && /*#__PURE__*/React__default.createElement("div", {
    className: css$w.by
  }, t('by'), " ", dashboard.user)), isShowDropdown && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$w.dropdown,
    items: [{
      title: t('delete'),
      onClick: onClickDelete
    }]
  })));
};

var css$x = {"loader":"_styles-module__loader__PK0JP","text":"_styles-module__text__1F-rx","dashboards-pulse":"_styles-module__dashboards-pulse__29IbF","grid":"_styles-module__grid__ef-jq","item":"_styles-module__item__1HBd8","pic":"_styles-module__pic__1z0LR","section":"_styles-module__section__14O5G"};

var Loader$2 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$x.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.section
  }))));
};

var css$y = {"list":"_styles-module__list__2tGd9","title":"_styles-module__title__lNufF","search":"_styles-module__search__3Vnt-","mobileSearch":"_styles-module__mobileSearch__28J_R","text":"_styles-module__text__2QiEZ","grid":"_styles-module__grid__31LQw","add":"_styles-module__add__1VMC5","caption":"_styles-module__caption__pTzl3"};

var List$1 = function List(_ref) {
  var addDashboard = _ref.addDashboard,
      addDashboardDisable = _ref.addDashboardDisable,
      currentUser = _ref.currentUser,
      data = _ref.data,
      deleteDashboard = _ref.deleteDashboard,
      loading = _ref.loading,
      user = _ref.user;

  var _useState = React.useState(''),
      search = _useState[0],
      setSearch = _useState[1];

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var onChangeSearch = function onChangeSearch(value) {
    return setSearch(value);
  };

  var getItems = function getItems() {
    var items = [];

    if (data && data.length) {
      if (search.length) items = data.filter(function (i) {
        return i.title.indexOf(search) >= 0;
      });else items = data;
    }

    return items;
  };

  var items = getItems();
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$2, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$y.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$y.search,
    placeholder: t('findDashboard'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$y.title
  }, currentUser === user ? t('myDashboards') : t('dashboardsOf', {
    name: user
  }), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement("span", null, data.length)), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$y.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$y.grid
  }, currentUser === user && /*#__PURE__*/React__default.createElement("div", {
    onClick: addDashboard,
    className: cx(css$y.add, {
      disabled: addDashboardDisable
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.caption
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('newDashboard'))), items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement(Item$1, {
      key: index,
      user: user,
      dashboard: item,
      deleteDashboard: currentUser === item.user && deleteDashboard
    });
  })));
};

var css$z = {"loader":"_styles-module__loader__FMgKh","text":"_styles-module__text__3kMB4","stacks-pulse":"_styles-module__stacks-pulse__2uZ4b","grid":"_styles-module__grid__1i-Vy","item":"_styles-module__item__3Q6le","pic":"_styles-module__pic__2gd5L","section":"_styles-module__section__BzTYi"};

var Loader$3 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$z.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.section
  }))));
};

var css$A = {"stacks":"_style-module__stacks__1YlOe","grid":"_style-module__grid__2Xblj","search":"_style-module__search__2JDJR","message":"_style-module__message__30aty","text":"_style-module__text__1qJHA","item":"_style-module__item__1AIvq","checkbox":"_style-module__checkbox__I8MzQ","buttons":"_style-module__buttons__3uEfC","button":"_style-module__button__22J0P"};

var AddStacksModal = function AddStacksModal(_ref) {
  var _ref$stacks = _ref.stacks,
      stacks = _ref$stacks === void 0 ? [] : _ref$stacks,
      loading = _ref.loading,
      isShow = _ref.isShow,
      onClose = _ref.onClose,
      onAddStacks = _ref.onAddStacks,
      currentUser = _ref.currentUser,
      user = _ref.user;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var params = reactRouter.useParams();

  var _useState = React.useState(''),
      searchQuery = _useState[0],
      setSearchQuery = _useState[1];

  var _useState2 = React.useState([]),
      selected = _useState2[0],
      setSelected = _useState2[1];

  React.useEffect(function () {
    if (!isShow) {
      setSelected([]);
      setSearchQuery('');
    }
  }, [isShow]);

  var getItems = function getItems() {
    var items = [];

    if (stacks && stacks.length) {
      if (searchQuery.length) items = stacks.filter(function (i) {
        return i.name.indexOf(searchQuery) >= 0;
      });else items = stacks;
    }

    return items;
  };

  var items = getItems();

  var onChangeSearch = function onChangeSearch(value) {
    return setSearchQuery(value);
  };

  var getFullStackName = function getFullStackName(stack) {
    return stack.user + "/" + stack.name;
  };

  var isChecked = function isChecked(stack) {
    var stackName = getFullStackName(stack);
    return selected.findIndex(function (i) {
      return i === stackName;
    }) >= 0;
  };

  var getOnClickStack = function getOnClickStack(stack) {
    return function () {
      var stackName = getFullStackName(stack);

      if (isChecked(stack)) {
        var filtered = selected.filter(function (i) {
          return i !== stackName;
        });
        setSelected(filtered);
      } else {
        setSelected([].concat(selected, [stackName]));
      }
    };
  };

  var submit = function submit() {
    if (onAddStacks) onAddStacks(selected);
    onClose();
  };

  return /*#__PURE__*/React__default.createElement(dstackReact.Modal, {
    dialogClassName: css$A.stacks,
    isShow: isShow,
    title: t('selectStacks'),
    onClose: onClose,
    withCloseButton: true
  }, !loading && Boolean(stacks.length) && /*#__PURE__*/React__default.createElement(dstackReact.SearchField, {
    className: css$A.search,
    isDark: true,
    size: "middle",
    showEverything: true,
    placeholder: t('findStack'),
    value: searchQuery,
    onChange: onChangeSearch
  }), loading && /*#__PURE__*/React__default.createElement(Loader$3, null), !loading && !stacks.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$A.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: params.user
  })), !loading && Boolean(stacks.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$A.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), !loading && Boolean(stacks.length && items.length) && /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.grid
  }, items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: css$A.item,
      key: index,
      onClick: getOnClickStack(item)
    }, /*#__PURE__*/React__default.createElement(dstackReact.CheckboxField, {
      className: css$A.checkbox,
      value: isChecked(item),
      readOnly: true
    }), /*#__PURE__*/React__default.createElement(dstackReact.StackListItem, {
      data: item,
      otherOwner: params.user !== item.user
    }));
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.buttons
  }, /*#__PURE__*/React__default.createElement(dstackReact.Button, {
    className: css$A.button,
    color: "primary",
    variant: "contained",
    disabled: !selected.length,
    onClick: submit
  }, t('addSelectedStacks')), /*#__PURE__*/React__default.createElement(dstackReact.Button, {
    className: css$A.button,
    color: "secondary",
    variant: "contained",
    onClick: onClose
  }, t('cancel')))));
};

exports.AccessForbidden = AccessForbidden;
exports.Avatar = Avatar;
exports.BackButton = BackButton;
exports.Button = Button;
exports.CheckboxField = CheckboxField;
exports.CodeViewer = CodeViewer;
exports.Copy = Copy;
exports.DashboardAddStacksModal = AddStacksModal;
exports.DashboardList = List$1;
exports.DashboardListItem = Item$1;
exports.Dropdown = Dropdown;
exports.FileDragnDrop = FileDragnDrop;
exports.Loader = Loader;
exports.MarkdownRender = MarkdownRender;
exports.Modal = Modal;
exports.NotFound = NotFound;
exports.ProgressBar = ProgressBar;
exports.SearchField = SearchField;
exports.SelectField = SelectField;
exports.SliderField = SliderField;
exports.Spinner = Spinner;
exports.StackAttachment = Attachment;
exports.StackAttachmentProvider = StateProvider;
exports.StackDetails = Details;
exports.StackFilters = StackFilters;
exports.StackFrames = Frames;
exports.StackHowTo = HowTo;
exports.StackHowToFetchData = HowTo$1;
exports.StackList = List;
exports.StackListItem = Item;
exports.StretchTitleField = StretchTitleField;
exports.Tabs = Tabs;
exports.TextAreaField = TextAreaField;
exports.TextField = TextField;
exports.Tooltip = Tooltip;
exports.ViewSwitcher = ViewSwitcher;
exports.Yield = Yield;
//# sourceMappingURL=index.js.map
