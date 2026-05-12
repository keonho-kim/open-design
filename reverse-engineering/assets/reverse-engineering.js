(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href === path) a.classList.add('active');
    });

    document.querySelectorAll('[data-copy]').forEach(function (button) {
      button.addEventListener('click', function () {
        var target = document.querySelector(button.getAttribute('data-copy'));
        if (!target) return;
        navigator.clipboard.writeText(target.textContent || '').then(function () {
          var old = button.textContent;
          button.textContent = 'Copied';
          setTimeout(function () { button.textContent = old; }, 900);
        }).catch(function () {});
      });
    });

    document.querySelectorAll('[data-filter]').forEach(function (input) {
      var selector = input.getAttribute('data-filter') || '[data-keywords]';
      input.addEventListener('input', function () {
        var q = input.value.trim().toLowerCase();
        document.querySelectorAll(selector).forEach(function (el) {
          var haystack = ((el.textContent || '') + ' ' + (el.getAttribute('data-keywords') || '')).toLowerCase();
          el.classList.toggle('hidden', q.length > 0 && haystack.indexOf(q) === -1);
        });
      });
    });

    document.querySelectorAll('[data-expand-all]').forEach(function (button) {
      button.addEventListener('click', function () {
        document.querySelectorAll('details').forEach(function (d) { d.open = true; });
      });
    });

    document.querySelectorAll('[data-collapse-all]').forEach(function (button) {
      button.addEventListener('click', function () {
        document.querySelectorAll('details').forEach(function (d) { d.open = false; });
      });
    });
  });
})();
