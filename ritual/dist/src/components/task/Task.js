'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = function (_Component) {
  _inherits(Task, _Component);

  function Task() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Task);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Task.__proto__ || Object.getPrototypeOf(Task)).call.apply(_ref, [this].concat(args))), _this), _this.togglChecked = function () {
      var task = _this.props.details;
      var updatedTask = Object.assign({}, task, { complete: true, disabled: true });
      _this.props.updateTask(_this.props.details.key, updatedTask);
      // update last used on system
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Task, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'li',
        { onChange: function onChange() {
            return _this2.togglChecked();
          }, className: 'flex lh-copy pa3 ph0-l bb b--black-10 content-center avenir' },
        _react2.default.createElement('input', {
          type: 'checkbox',
          checked: this.props.details.complete,
          disabled: this.props.details.disabled,
          className: 'w2 h2 w3-ns h3-ns br-100' }),
        _react2.default.createElement(
          'div',
          { className: 'pl3 flex-auto ttu' },
          _react2.default.createElement(
            'span',
            { className: 'f6 db black-70' },
            this.props.details.name
          )
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.props.removeTask(_this2.props.details.key);
            }, className: 'b ph3 pv1 input-reset bn b--black bg-transparent grow pointer f6 dib' },
          _react2.default.createElement(
            'span',
            { className: 'f6 db black-70' },
            'x'
          )
        )
      );
    }
  }]);

  return Task;
}(_react.Component);

exports.default = Task;

//# sourceMappingURL=Task.js.map