(ns con3.views
  (:use [hiccup core page]))

(defn index-page []
  (html5
   [:head
    [:title "con3"]
    (include-js "js/jquery-2.0.2.js")
    (include-js "js/w2ui-1.2.min.js")
    (include-css "css/w2ui-1.2.min.css")
    
    (include-css "css/style.css")
    (include-js "js/renderer/three.min.js")
    (include-js "js/renderer/tween.min.js")
    (include-js "js/renderer/TrackballControls.js")
    (include-js "js/renderer/CSS3DRenderer.js")
    (include-js "js/data.js")
    (include-js "js/code.js")
    ]
   [:body {:onload "draw('layout_layout_panel_main', 'layout_layout_panel_top', 'layout_layout_panel_left')"}
    [:div#layout {:style "height: 960px;"}
     ]]))
