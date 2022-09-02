# public
### image
There is a default img when there's no banner playing.
### json
    -imgs:
        *using uuid as key
        *name: name of the img
        *start: the starting time of the image on the banner
        *end: the finishing time of the image on the banner
        *show:
            0.neither rendered or deleted
            1.rendered
    -fanPages: record urls of the current fan pages rendering on the front stage
    
<div style="border: 1px solid black">
    <strong>url paths are designed in RESTful pattern</strong>
</div>

# routers
distinguish routes for admin and public
# routes
### admin
    -imgs
        *GET  /admin/imgs       : get status of all submitted images
        *POST /admin/imgs       : update status of all submitted images
        *POST /admin/imgs/{name}: upload an image
    -fanPages
        *POST /admin/fanPages   : update urls of all the fan pages
### public
    -fanPages
        *GET /public/fanPages   : get all urls of the fan pages
    -banners
        *GET /public/banners    : get name of all imgs shown on the banner
    -imgs
        *GET /public/imgs/{name}: get image from source, return default.png if not found
