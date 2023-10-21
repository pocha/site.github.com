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
  var tagRemoverCross = function (t) {
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
    createTag = function (e) {
      var t = document.createElement("span")
      return (
        (t.className = "tg-tag"),
        (t.innerHTML = e),
        (t.dataset.tagValue = e),
        t.insertAdjacentElement("beforeend", tagRemoverCross(t)),
        t
      )
    },
    createTagNotYetSelected = function (tagValue, clickFunction) {
      var t = document.createElement("span")
      return (
        (t.className = "button"),
        (t.innerHTML = tagValue),
        (t.dataset.tagValue = tagValue),
        //t.insertAdjacentElement("beforeend", tagRemoverCross(t)),
        t.addEventListener("click", clickFunction),
        t
      )
    },
    sortTags = function (taglist) {
      let tagsArray = Array.from(taglist)
      tagsArray.sort()
      return new Set(tagsArray)
    },
    e = function (r) {
      var e,
        t,
        n,
        a = function () {
          r.dispatchEvent(
            new CustomEvent("updateTagsList", { bubbles: !0, detail: { tagsList: preSelectedTagsArray } })
          )
        },
        i = function (e) {
          if ([188, 13].includes(e)) {
            var t = ((n = inputField.value), (inputField.value = ""), n.replace(",", "").trim())
            t.length && (preSelectedTagsArray.push(t), (r.dataset.tagsList = preSelectedTagsArray), a())
          }
          var n
        },
        inputField =
          ((e = r.dataset),
          ((t = document.createElement("input")).className = "tg-input"),
          (t.type = "text"),
          void 0 !== e.tagsPlaceholder && e.tagsPlaceholder.length && (t.placeholder = e.tagsPlaceholder),
          t),
        selectedTagsWrapper =
          (((n = document.createElement("div")).className = "tg-wrapper"), (n.id = "selected-tags-wrapper"), n),
        allTagsWrapper =
          (((n = document.createElement("div")).className = "tg-wrapper"), (n.id = "all-tags-wrapper"), n),
        preSelectedTagsArray =
          void 0 !== r.dataset.tagsList && r.dataset.tagsList.length ? r.dataset.tagsList.split(",") : [], //TODO - array of tags is not trimmed yet
        allTagsSet = (() => {
          const items = document.querySelectorAll("#resource-list > li")
          let _allTags = new Set()
          for (var i = 0; i < items.length; i++) {
            const itemTags = items[i].getAttribute("data-tags")
            itemTags.split(",").forEach((tagValue) => {
              _allTags.add(tagValue.trim())
            })
          }
          return sortTags(_allTags)
        })()
      ;(r.className = "tg-editor"),
        (r.dataset.tagsList = preSelectedTagsArray),
        r.insertAdjacentElement("beforeend", inputField),
        r.insertAdjacentElement("beforeend", selectedTagsWrapper),
        r.insertAdjacentElement("beforeend", allTagsWrapper),
        inputField.addEventListener("keyup", function (e) {
          return i(e.keyCode)
        }),
        r.addEventListener("updateTagsList", function (e) {
          // clean selected tags view
          let selectedTagSpans = document.querySelectorAll("#selected-tags-wrapper > span")
          selectedTagSpans.forEach((span) => span.remove())

          // clean all tags view
          let allTagsSpans = document.querySelectorAll("#all-tags-wrapper > span")
          allTagsSpans.forEach((span) => span.remove())

          let allTagsCopy = new Set(allTagsSet)
          //TODO - sort the tags
          preSelectedTagsArray.forEach((tag) => {
            selectedTagsWrapper.insertAdjacentElement("beforeend", createTag(tag))
            allTagsCopy.delete(tag)
          })
          allTagsCopy = sortTags(allTagsCopy)
          allTagsCopy.forEach((tag) => {
            allTagsWrapper.insertAdjacentElement(
              "beforeend",
              createTagNotYetSelected(tag, () => {
                preSelectedTagsArray.push(tag)
                t.dispatchEvent(
                  new CustomEvent("updateTagsList", { bubbles: !0, detail: { tagsList: preSelectedTagsArray } })
                )
              })
            )
          })
          console.log("allTagsSet", allTagsSet)
        }),
        r.addEventListener("removedTag", function (e) {
          return (
            (t = e.detail.tagValue),
            (preSelectedTagsArray = preSelectedTagsArray.filter(function (e) {
              return e !== t
            })),
            (r.dataset.tagsList = preSelectedTagsArray),
            void a()
          )
          var t
        }),
        a() //this will populate initial data
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
    "* {\n    box-sizing: border-box;\n}\n\n.tg-description {\n    background: #e0e0e0;\n    display: inline-block;\n    font-size: 12px;\n    padding: 7px 12px;\n    margin: 0 0 20px;\n    border-radius: 5px;\n}\n\n.tg-editor {\n    background: #ffffff;\n    border: none;\n    border-radius: 5px;\n    color: #000000;\n    margin-top: 10px;\n    overflow: scroll;\n    padding: 10px;\n}\n\n.tg-editor:focus {\n    outline: none;\n}\n\n.tg-editor .tg-input {\n    width: 100%;\n    border: 1px solid #e0e0e0;\n    padding: 15px;\n    border-radius: 5px;\n}\n\n.tg-editor .tg-input::placeholder {\n    color: #aaaaaa;\n}\n\n.tg-wrapper {\n    margin-top: 20px;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    align-content: flex-start;\n    justify-content: flex-start;\n    align-items: center;\n}\n\n.tg-tag {\n    display: flex;\n    align-items: center;\n    margin-right: 5px;\n  margin-bottom: 5px;\n    border-radius: 10px;\n    padding: 5px 10px;\n    background: #388cd7;\n    color: #ffffff;\n    font-size: 12px;\n}\n\n.tg-tag i {\n    margin-left: 5px;\n    color: #ffffff;\n    background: #136ac6;\n    opacity: 0.7;\n    font-size: 16px;\n    border-radius: 50%;\n    cursor: default;\n}\n\n.tg-tag i:hover {\n    opacity: 1;\n}"
  ),
    document.querySelectorAll("[data-tags-editor]").forEach(e),
    (window.__tagsEditor = { initializeEditor: e })
})()

document.addEventListener("updateTagsList", function (e) {
  resetFilter()
  var tags = e.detail.tagsList
  for (var i = 0; i < tags.length; i++) {
    filterTag(tags[i].toLowerCase())
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
