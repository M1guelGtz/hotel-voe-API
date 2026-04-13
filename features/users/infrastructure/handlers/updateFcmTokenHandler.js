const fcmService = require('../../../../core/firebase/fcmService');

class UpdateFcmTokenHandler {
  async handle(req, res) {
    try {
      const userId = req.user.id;
      const { fcm_token } = req.body;

      if (!fcm_token || typeof fcm_token !== 'string') {
        return res.status(400).json({ message: 'fcm_token is required' });
      }

      await fcmService.saveFcmToken(userId, fcm_token);
      res.status(200).json({ message: 'FCM token updated' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = UpdateFcmTokenHandler;
