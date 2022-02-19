import express from "express";
const router = express.Router();

import { createOrUpdateRoom, isSharingActive, stopSharing, getSharing, joinSharing, getUsersForSharing } from '../controllers/sharingController.js';

router.post('/', createOrUpdateRoom);
router.post('/:sharingId', stopSharing);
router.get('/:sharingId', getSharing);
router.get('/:sharingId/isActive', isSharingActive);
router.post('/:sharingId/join', joinSharing);
router.get('/:sharingId/users', getUsersForSharing);

export default router;