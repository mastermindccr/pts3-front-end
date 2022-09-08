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

# routers
distinguish routes for admin and public.
<div style="border: 1px solid black">
    <strong>url paths are designed in RESTful pattern.</strong>
</div>

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
        *GET /public/imgs/{name}: get image from source, return default img if not found

# Notice
### If a user asks for inexistent api endpoint, the server will respond with 404 except for /public/imgs/{name}, which will redirect to default.jpg.

### If desire to change default image, please replace "default.jpg" under the path /public/img with another image with same name.