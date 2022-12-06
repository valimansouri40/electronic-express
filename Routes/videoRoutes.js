const express = require('express');
const { Protected, ResterictTo } = require('../Controllers/UserControls');
const video = require('../Controllers/videoControls');
const videoRouter = express.Router();

// videoRouter.post('/video',Protected, ResterictTo('admin'),
//  video.resizeAndSaveImage, video.createVideo)

videoRouter.route('/').get(video.getAllVideo).post(Protected, ResterictTo('admin'),
 video.resizeAndSaveImage, video.createVideo)


videoRouter.route('/:id').get(video.getVideoById)
.patch(Protected,ResterictTo('admin') , video.updateVideoById)
.delete(Protected, ResterictTo('admin'), video.deleteVideoById)

module.exports = videoRouter;
