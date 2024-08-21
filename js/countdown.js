var app = {
  start: function() {
    app.check();
  },
  check: function() {
    setTimeout(app.check, 100);
  }
};
(function() {
    app.startUps = [];
    app.has = function(value) {
      var found = true;
      for (var i=0; i<=arguments.length-1; i++) {
        var value = arguments[i];
        if (!(typeof value !== "undefined" && value !== null && value !== "")) found = false;
      }
      return found;
    };
    app.camelCase = function camelize(str, capitalFirst) {
      if (!app.has(capitalFirst)) capitalFirst = false;
      var result = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, '');
      if (capitalFirst) result = result.substr(0, 1).toUpperCase() + result.substr(1, 999);
      return result;
    };
    app.properCase = function(str) {
      return str.replace(
        /\w\S*/g,
        function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }
      );
    };
  })();
app["build"] = {};
app["config"] = {};
app["images"] = {};
app["styles"] = {};

(function() {
    if (app.has(app.api) === true) { // callbacks
      (function() {
        var callbackLevel = function(apiLevel) {
          if (app.has(apiLevel) && !app.has(apiLevel.length)) {
            for (var moduleName in apiLevel) {
              if (app.has(apiLevel[moduleName]) === true) {
                callbackLevel(apiLevel[moduleName]);
                for (var key in apiLevel[moduleName]) {
                  (function(moduleName, key) {
                    var func = apiLevel[moduleName][key];
                    if (key.split("Callback").length > 1 && typeof func === "function") {
                      apiLevel[moduleName][key.split("Callback").shift() + "Multi"] = async function(count, name, callback, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
                        return new Promise(function(resolve, reject) {
                          if (!app.has(count)) count = 1;
                          var rCount = 0;
                          var resolveCount;
                          for (var i=0; i<=count-1; i++) {
                            (async function(index) {
                              var countResult = await apiLevel[moduleName][key.split("Callback").shift()](name, async function(arg1, arg2, arg3, arg4, arg5) {
                                if (typeof callback === "function") {
                                  var result = await callback(arg1, arg2, arg3, arg4, arg5);
                                  if (result === true && !app.has(resolveCount)) {
                                    console.log("MULTI INDEX:", index);
                                    resolveCount = index;
                                  }
                                  return result;
                                }
                              }, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                              rCount += 1;
                              if (resolveCount === index || rCount >= count) resolve(countResult);
                            })(i);
                          }
                        });
                      };
                      apiLevel[moduleName][key.split("Callback").shift()] = async function(name, callback, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
                        if (typeof callback !== "function") {
                          arg15 = arg13; arg14 = arg12; arg13 = arg11; arg12 = arg10; arg11 = arg9; arg10 = arg8;arg9 = arg7; arg8 = arg6; arg7 = arg5; arg6 = arg4; arg5 = arg3; arg4 = arg2; arg3 = arg1; arg2 = callback; arg1 = name;
                        }
                        var output, error;
                        await apiLevel[moduleName][key](async function(data, page) {
                          var result = typeof callback === "function" ? await callback(data, page) : undefined;
                          if (app.has(result) && app.has(result.length)) {
                            if (!app.has(output)) output = [];
                            output = output.concat(result);
                          } else {
                            output = data;
                          }
                          return result;
                        }, function(err, errorText) {
                          error = {error: err, errorText};
                        }, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        var obj = {};
                        if (typeof callback !== "function") return output;
                        obj[name] = output;
                        obj.error = error;
                        return obj;
                      };
                    }
                  })(moduleName, key);
                }
              }
            }
          }
        };
        callbackLevel(app.api);
      })();
    }

    // call in the end
    if (typeof app.start === "function") {
      app.start();
    }

    for (var i=0; i<=app.startUps.length-1; i++) {
      if (typeof app.startUps[i] === "function") {
        app.startUps[i]();
      }
    }
    for (var i=0; i<=app.startUps.length-1; i++) {
      if (!(typeof app.startUps[i] === "function")) {
        setTimeout(app.startUps[i].callback, app.startUps[i].time);
      }
    }
  })();

/* Timelines could have been written in a better way, I am sorry if I wrote them in a hurry. :D */
(function() {
  var animation = {
    newYear: document.querySelector(".new-year"),
    range: function(min,max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    get period() {
      var enlace = new Date("September 20, 2025 13:00:00");
      var hoy = new Date();
      var segundos = Math.floor((enlace - (hoy))/1000);
      var minutos = Math.floor(segundos/60);
      var horas = Math.floor(minutos/60);
      var dias = Math.floor(horas/24);
      horas = horas-(dias*24);
      minutos = minutos-(dias*24*60)-(horas*60);
      segundos = segundos-(dias*24*60*60)-(horas*60*60)-(minutos*60);
      return {
        year: "20 SEP 2025",
        dias: dias,
        horas: horas,
        minutos: minutos,
        segundos: segundos
      }
    },
    element: function(parent, type, className, html) {
      var element = document.createElement(type);
      element.className = className;
      if (typeof html !== "undefined") element.innerHTML = html;
      parent.appendChild(element);
      return element;
    },
    year: function(className) {
      var timeline = new TimelineMax();
      var year = animation.element(animation.newYear, "div", className);
      for (var i=0; i<=String(animation.period.year).length-1; i++) {
        var digit = animation.element(year, "div", "digit", String(animation.period.year).substr(i, 1));
        digit.style.top = (0 - (digit.clientHeight * 2)) + "px";
        timeline
          .to(digit, 0.5, {top: 0, opacity: 1, ease: Bounce.easeOut});
      }
      return year;
    },
    animate: function() {
      var year1 = animation.year("year year1");
      var year2 = animation.year("year year2");
      var controls = animation.element(animation.newYear, "div", "controls");
      var dias = animation.element(controls, "div", "control dias");
      var horas = animation.element(controls, "div", "control horas");
      var minutos = animation.element(controls, "div", "control minutos");
      var segundos = animation.element(controls, "div", "control segundos");
      animation.controls = {
        controls: controls,
        dias: dias,
        horas: horas,
        minutos: minutos,
        segundos: segundos
      };
      animation.render();
      var triangles = animation.element(year1, "div", "triangles");
      var fullTimeline = new TimelineMax();
      var triangleStorage = [];
      for (var i=0; i<=50-1; i++) {
        var timeline = new TimelineMax({repeat: -1});
        var triangle = animation.element(triangles, "div", "triangle");
        triangle.style.top = -50 + "px";
        var time = animation.range(0, 100) / 100;
        var duration = 1;
        var direction = animation.range(1, 2) == 1 ? -1 : 1;
        timeline
          .set(triangle, {scale: animation.range(10, 20) / 10}, time)
          .to(triangle, duration * 0.5, {opacity: 1}, time)
          .to(triangle, duration, {top: "200%", rotationZ: animation.range(180, 360) * direction, rotationX: animation.range(180, 360) * direction}, time)
          .to(triangle, duration * 0.5, {opacity: 0}, time + (duration * 0.5));
        fullTimeline.add(timeline, 0);
        triangleStorage.push(triangle);
      }
      var previousWidth = 0;
      var checkWidth = function() {
        if (Math.abs(previousWidth - year1.clientWidth) > 1) {
          for (var i=0; i<=triangleStorage.length-1; i++) {
            triangleStorage[i].style.left = (-5 + animation.range(0, year1.clientWidth)) + "px";
          }
          previousWidth = year1.clientWidth;
        }
        setTimeout(checkWidth, 100);
      }
      checkWidth();
      return new TimelineMax()
        .to(dias, 0.5, {top: 0, opacity: 1}, 0)
        .to(horas, 0.5, {top: 0, opacity: 1}, 0.25)
        .to(minutos, 0.5, {top: 0, opacity: 1}, 0.5)
        .to(segundos, 0.5, {top: 0, opacity: 1}, 0.75)
        .set(triangles, {opacity: 1}, 3)
        .add(fullTimeline, 3);
    },
    plural: function(property) {
      var period = animation.period;
      if (String(period[property]).length <= 1) period[property] = "0" + period[property];
      return Number(period[property]) > 1 ? period[property] + " " + property : period[property] + " " + property.substr(0, property.length-1);
    },
    render: function() {
      animation.controls.segundos.innerHTML = animation.plural("segundos");
      animation.controls.minutos.innerHTML = animation.plural("minutos");
      animation.controls.horas.innerHTML = animation.plural("horas");
      animation.controls.dias.innerHTML = animation.plural("dias");
      requestAnimationFrame(animation.render);
    }
  };
  animation.animate();
})();