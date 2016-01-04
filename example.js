var Model = (function(){
  function Model() {}
  Model.prototype = new Observable();
  Model.prototype.doWorkAsync = function() {
    setTimeout(function() {
      Model.prototype.trigger('completed');
    }, 3000);
    return this;
  };
  return Model;
})();
var instance = new Model();
instance.on('completed', function() {
  console.log('[1]catch doWorkCompleted event', this);
  instance.off('completed', arguments.callee);
});
instance.on('completed', function() {
  console.log('[2]catch doWorkCompleted event', this);
  instance.off('completed', arguments.callee);
}, instance);
instance.doWorkAsync();
