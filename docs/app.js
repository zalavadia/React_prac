(function () {
  const STORAGE_KEY = "react-path-done-v1";

  const sidebar = document.getElementById("sidebar");
  const welcome = document.getElementById("welcome");
  const detail = document.getElementById("detail");
  const search = document.getElementById("search");
  const progressLabel = document.getElementById("progressLabel");
  const doneBtn = document.getElementById("doneBtn");

  const detailLevel = document.getElementById("detailLevel");
  const detailTitle = document.getElementById("detailTitle");
  const detailFile = document.getElementById("detailFile");
  const detailIntro = document.getElementById("detailIntro");
  const qaList = document.getElementById("qaList");

  let activeKey = null;

  function loadDone() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (err) {
      return [];
    }
  }

  function saveDone(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function topicKey(level, file) {
    return level + "::" + file;
  }

  function allTopicsFlat() {
    const out = [];
    TOPICS.forEach(function (section) {
      section.items.forEach(function (item) {
        out.push(item);
      });
    });
    return out;
  }

  function updateProgress() {
    const done = loadDone();
    const total = allTopicsFlat().length;
    progressLabel.textContent = done.length + " / " + total + " done";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderSidebar(filter) {
    const q = (filter || "").trim().toLowerCase();
    const done = loadDone();
    sidebar.innerHTML = "";

    TOPICS.forEach(function (section, sectionIndex) {
      const items = section.items.filter(function (item) {
        if (!q) return true;
        const blob =
          item.title +
          " " +
          item.file +
          " " +
          (item.kya || "") +
          " " +
          (item.intro || "");
        return blob.toLowerCase().includes(q);
      });
      if (!items.length) return;

      const block = document.createElement("div");
      block.className = "level-block";
      block.style.animationDelay = sectionIndex * 40 + "ms";

      const h = document.createElement("p");
      h.className = "level-title";
      h.textContent = section.level;
      block.appendChild(h);

      items.forEach(function (item) {
        const key = topicKey(section.level, item.file);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "topic-btn";
        if (done.includes(key)) btn.classList.add("done");
        if (activeKey === key) btn.classList.add("active");

        const qn = (item.questions && item.questions.length) || 0;
        btn.innerHTML =
          '<span class="dot" aria-hidden="true"></span><span><strong></strong><span></span></span>';
        btn.querySelector("strong").textContent = item.title;
        btn.querySelector("span span").textContent =
          item.file + (qn ? " · " + qn + " Qs" : "");

        btn.addEventListener("click", function () {
          showTopic(section.level, item);
        });

        block.appendChild(btn);
      });

      sidebar.appendChild(block);
    });
  }

  function showTopic(level, item) {
    activeKey = topicKey(level, item.file);
    welcome.classList.add("hidden");
    detail.classList.remove("hidden");

    detailLevel.textContent = level;
    detailTitle.textContent = item.title;
    detailFile.textContent = item.file;
    detailIntro.textContent = item.intro || item.detail || item.kya || "";

    qaList.innerHTML = "";
    const questions = item.questions || [];
    if (!questions.length) {
      qaList.innerHTML =
        '<p class="muted">Is topic me abhi Q&A parse nahi hua.</p>';
    } else {
      questions.forEach(function (qa, i) {
        const card = document.createElement("div");
        card.className = "qa-card";
        card.style.animationDelay = i * 30 + "ms";

        let html = "<h4>" + escapeHtml(qa.title) + "</h4>";
        if (qa.explain) {
          html +=
            '<p class="qa-explain">' +
            escapeHtml(qa.explain).replace(/\n/g, "<br>") +
            "</p>";
        }
        if (qa.code) {
          html +=
            '<p class="qa-label">Answer / Code</p><pre class="qa-code"><code>' +
            escapeHtml(qa.code) +
            "</code></pre>";
        }
        card.innerHTML = html;
        qaList.appendChild(card);
      });
    }

    const done = loadDone();
    const isDone = done.includes(activeKey);
    doneBtn.textContent = isDone ? "Done ✓" : "Mark done";
    doneBtn.classList.toggle("is-done", isDone);

    renderSidebar(search.value);
    updateProgress();
    detail.scrollTop = 0;
    panelScrollTop();
  }

  function panelScrollTop() {
    const panel = document.getElementById("panel");
    if (panel) panel.scrollTop = 0;
  }

  doneBtn.addEventListener("click", function () {
    if (!activeKey) return;
    let done = loadDone();
    if (done.includes(activeKey)) {
      done = done.filter(function (k) {
        return k !== activeKey;
      });
    } else {
      done.push(activeKey);
    }
    saveDone(done);
    const parts = activeKey.split("::");
    const level = parts[0];
    const file = parts.slice(1).join("::");
    let found = null;
    TOPICS.forEach(function (section) {
      if (section.level !== level) return;
      section.items.forEach(function (item) {
        if (item.file === file) found = item;
      });
    });
    if (found) showTopic(level, found);
  });

  search.addEventListener("input", function () {
    renderSidebar(search.value);
  });

  renderSidebar("");
  updateProgress();
})();
