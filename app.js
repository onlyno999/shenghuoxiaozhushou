(function () {
  var factors = { km: 1000, m: 1, cm: 0.01, kg: 1, g: 0.001, jin: 0.5 };
  var baseUnit = { km: "m", m: "m", cm: "m", kg: "kg", g: "kg", jin: "kg" };
  function convert() {
    var v = parseFloat(document.getElementById("convValue").value);
    var f = document.getElementById("convFrom").value;
    var t = document.getElementById("convTo").value;
    var out = document.getElementById("convResult");
    if (isNaN(v)) { out.textContent = "-"; return; }
    if (baseUnit[f] !== baseUnit[t]) { out.textContent = "不同类单位不能换算"; return; }
    var r = v * factors[f] / factors[t];
    out.textContent = v + " " + f + " = " + Math.round(r * 10000) / 10000 + " " + t;
  }
  ["convValue", "convFrom", "convTo"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", convert);
  });
  convert();

  function bmi() {
    var h = parseFloat(document.getElementById("bmiHeight").value) / 100;
    var w = parseFloat(document.getElementById("bmiWeight").value);
    var out = document.getElementById("bmiResult");
    if (!h || !w) { out.textContent = "-"; return; }
    var v = w / (h * h);
    var label = v < 18.5 ? "偏瘦" : v < 24 ? "正常" : v < 28 ? "超重" : "肥胖";
    out.textContent = "BMI " + (Math.round(v * 10) / 10) + "，" + label;
  }
  ["bmiHeight", "bmiWeight"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", bmi);
  });
  bmi();

  var list = document.getElementById("todoList");
  var input = document.getElementById("todoInput");
  var items = [];
  try { items = JSON.parse(localStorage.getItem("todoItems") || "[]"); } catch (e) { items = []; }
  function save() { localStorage.setItem("todoItems", JSON.stringify(items)); }
  function render() {
    list.innerHTML = "";
    items.forEach(function (item, i) {
      var li = document.createElement("li");
      li.textContent = item.text;
      if (item.done) li.className = "done";
      li.addEventListener("click", function () { items[i].done = !items[i].done; save(); render(); });
      list.appendChild(li);
    });
  }
  function add() {
    var text = input.value.trim();
    if (!text) return;
    items.push({ text: text, done: false });
    input.value = "";
    save(); render();
  }
  document.getElementById("todoAdd").addEventListener("click", add);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") add(); });
  render();
})();
