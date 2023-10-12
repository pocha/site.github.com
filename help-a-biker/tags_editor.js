!(function () {
  "use strict"
  function s(e, t) {
    ;(null == t || t > e.length) && (t = e.length)
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
    return r
  }
  function l(e, t) {
    var n = ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"]
    if (!n) {
      if (
        Array.isArray(e) ||
        (n = (function (e, t) {
          if (e) {
            if ("string" == typeof e) return s(e, t)
            var n = Object.prototype.toString.call(e).slice(8, -1)
            return (
              "Object" === n && e.constructor && (n = e.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(e)
                : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? s(e, t)
                : void 0
            )
          }
        })(e)) ||
        (t && e && "number" == typeof e.length)
      ) {
        n && (e = n)
        var r = 0,
          a = function () {}
        return {
          s: a,
          n: function () {
            return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] }
          },
          e: function (e) {
            throw e
          },
          f: a,
        }
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      )
    }
    var i,
      o = !0,
      d = !1
    return {
      s: function () {
        n = n.call(e)
      },
      n: function () {
        var e = n.next()
        return (o = e.done), e
      },
      e: function (e) {
        ;(d = !0), (i = e)
      },
      f: function () {
        try {
          o || null == n.return || n.return()
        } finally {
          if (d) throw i
        }
      },
    }
  }
  var n = function (t) {
      var e = document.createElement("i")
      return (
        (e.className = "material-symbols-outlined"),
        (e.innerHTML = "close"),
        e.addEventListener("click", function () {
          return (
            (e = t).dispatchEvent(
              new CustomEvent("removedTag", { bubbles: !0, detail: { tagValue: e.dataset.tagValue } })
            ),
            void e.remove()
          )
          var e
        }),
        e
      )
    },
    c = function (e) {
      var t = document.createElement("span")
      return (
        (t.className = "tg-tag"),
        (t.innerHTML = e),
        (t.dataset.tagValue = e),
        t.insertAdjacentElement("beforeend", n(t)),
        t
      )
    },
    e = function (r) {
      var e,
        t,
        n,
        a = function () {
          r.dispatchEvent(new CustomEvent("updateTagsList", { bubbles: !0, detail: { tagsList: s } }))
        },
        i = function (e) {
          if ([188, 13].includes(e)) {
            var t = ((n = o.value), (o.value = ""), n.replace(",", "").trim())
            t.length && (s.push(t), (r.dataset.tagsList = s), d.insertAdjacentElement("beforeend", c(t)), a())
          }
          var n
        },
        o =
          ((e = r.dataset),
          ((t = document.createElement("input")).className = "tg-input"),
          (t.type = "text"),
          void 0 !== e.tagsPlaceholder && e.tagsPlaceholder.length && (t.placeholder = e.tagsPlaceholder),
          t),
        d = (((n = document.createElement("div")).className = "tg-wrapper"), n),
        s = void 0 !== r.dataset.tagsList && r.dataset.tagsList.length ? r.dataset.tagsList.split(",") : []
      ;(r.className = "tg-editor"),
        (r.dataset.tagsList = s),
        r.insertAdjacentElement("beforeend", o),
        r.insertAdjacentElement("beforeend", d),
        (function () {
          var e,
            t = l(s)
          try {
            for (t.s(); !(e = t.n()).done; ) {
              var n = e.value
              d.insertAdjacentElement("beforeend", c(n))
            }
          } catch (e) {
            t.e(e)
          } finally {
            t.f()
          }
        })(),
        o.addEventListener("keyup", function (e) {
          return i(e.keyCode)
        }),
        r.addEventListener("removedTag", function (e) {
          return (
            (t = e.detail.tagValue),
            (s = s.filter(function (e) {
              return e !== t
            })),
            (r.dataset.tagsList = s),
            void a()
          )
          var t
        })
    }
  !(function (e, t) {
    void 0 === t && (t = {})
    var n = t.insertAt
    if (e && "undefined" != typeof document) {
      var r = document.head || document.getElementsByTagName("head")[0],
        a = document.createElement("style")
      ;(a.type = "text/css"),
        "top" === n && r.firstChild ? r.insertBefore(a, r.firstChild) : r.appendChild(a),
        a.styleSheet ? (a.styleSheet.cssText = e) : a.appendChild(document.createTextNode(e))
    }
  })(
    "* {\n    box-sizing: border-box;\n}\n\n.tg-description {\n    background: #e0e0e0;\n    display: inline-block;\n    font-size: 12px;\n    padding: 7px 12px;\n    margin: 0 0 20px;\n    border-radius: 5px;\n}\n\n.tg-editor {\n    background: #ffffff;\n    border: none;\n    border-radius: 5px;\n    color: #000000;\n    margin-top: 10px;\n    overflow: scroll;\n    padding: 10px;\n}\n\n.tg-editor:focus {\n    outline: none;\n}\n\n.tg-editor .tg-input {\n    width: 100%;\n    border: 1px solid #e0e0e0;\n    padding: 15px;\n    border-radius: 5px;\n}\n\n.tg-editor .tg-input::placeholder {\n    color: #aaaaaa;\n}\n\n.tg-wrapper {\n    margin-top: 20px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    align-content: flex-start;\n    justify-content: flex-start;\n    align-items: center;\n}\n\n.tg-tag {\n    display: flex;\n    align-items: center;\n    margin-right: 5px;\n    border-radius: 3px;\n    padding: 5px 10px;\n    background: #388cd7;\n    color: #ffffff;\n    font-size: 12px;\n}\n\n.tg-tag i {\n    margin-left: 5px;\n    color: #ffffff;\n    background: #136ac6;\n    opacity: 0.7;\n    font-size: 16px;\n    border-radius: 50%;\n    cursor: default;\n}\n\n.tg-tag i:hover {\n    opacity: 1;\n}"
  ),
    document.querySelectorAll("[data-tags-editor]").forEach(e),
    (window.__tagsEditor = { initializeEditor: e })
})()

document.addEventListener("updateTagsList", function (e) {
  console.log(e)
  resetFilter()
  var tags = e.detail.tagsList
  for (var i = 0; i < tags.length; i++) {
    filterTag(tags[i])
  }
})

// Filter tag
function filterTag(tag) {
  var items = document.querySelectorAll("li")

  for (var i = 0; i < items.length; i++) {
    var itemTags = items[i].getAttribute("data-tags")

    // Catch case with no tags
    if (itemTags != null) {
      if (itemTags.indexOf(tag) < 0) {
        items[i].setAttribute("data-toggle", "off")
      }
    }
  }
}

// Reset filters
function resetFilter() {
  var items = document.querySelectorAll("li")

  for (var i = 0; i < items.length; i++) {
    items[i].setAttribute("data-toggle", "on")
  }
}
