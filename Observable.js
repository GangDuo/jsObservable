var Observable = (function() {
  function Observable() {
    console.log('Observable()');
    this._events = {};
  }
  /**
   * イベントハンドラ登録
   * @author Onoda
   * @param name イベント名
   * @param callback イベントハンドラ
   * @param context イベントハンドラがコールされた時のthis
   * @return 自インスタンス
   */
  Observable.prototype.on = function(name, callback, context) {
      var observers = this._events[name] || (this._events[name] = []);
      observers.push({update: callback, context: context});
      return this;
  };
  /**
   * イベントハンドラ削除
   * @author Onoda
   * @param name イベント名
   * @param callback イベントハンドラ
   * @param context イベントハンドラがコールされた時のthis
   * @return 自インスタンス
   */
  Observable.prototype.off = function(name, callback, context) {
    var observers = this._events[name];
    if(!observers) {
      return this;
    }
    var remaining = [];
    observers.forEach(function(observer) {
      if(callback && callback !== observer.update || context && context !== observer.context) {
        remaining.push(observer);
      }
    });
    if(remaining.length > 0) {
      this._events[name] = remaining;
    } else {
      delete this._events[name];
    }
    console.log('off', this._events[name]);
    return this;
  };
  /**
   * イベントハンドラ呼び出し
   * @author Onoda
   * @param name イベント名
   * @param args 引数
   * @return 自インスタンス
   */
  Observable.prototype.trigger = function(name, args/*[]*/) {
      var observers = this._events[name] || [];
      observers.forEach(function(observer) {
        observer.update.apply(observer.context || this, args);
      });
      return this;
  };
  return Observable;
})();
