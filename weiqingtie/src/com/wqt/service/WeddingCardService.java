package com.wqt.service;

import java.util.List;

import com.wqt.dao.PhotoDao;
import com.wqt.dao.WeddingCardDao;
import com.wqt.model.Photo;
import com.wqt.model.WeddingCard;
import com.wqt.util.AppException;

/**
 * @author Jinde
 * @since 2013-10-8
 * 
 */
public class WeddingCardService {
	private WeddingCardDao cardDao;

	private PhotoDao photoDao;

	public WeddingCardService() {
		super();

		try {
			cardDao = new WeddingCardDao();
			photoDao = new PhotoDao();
		} catch (AppException e) {
			// do nothing
		}
	}

	public WeddingCard findWeddingCardWithPhotos(final long cardId) {
		WeddingCard card = null;

		try {
			card = cardDao.find(cardId);
			if (card != null) {
				List<Photo> photos = photoDao.findPhotosByCardId(card.getCardId());
				card.setPhotos(photos);
				
				if (photos != null && photos.size() > 0) {
					for (Photo photo : photos) {
						photo.setWeddingCard(card);
					}
				}
			}
		} catch (AppException e) {
			// do nothing.
		}

		return card;
	}

	public List<WeddingCard> findWeddingCardsByUserId(final long userId) {
		List<WeddingCard> cards = null;
		try {
			cards = cardDao.findWeddingCardsByUserId(userId);
		} catch (AppException e) {
			// do nothing
		}

		return cards;
	}

	public boolean deleteWeddingCard(final long cardId, final long userId) {
		try {
			WeddingCard card = cardDao.find(cardId);
			if (card.getUser().getUserId() != userId) {
				// the card doesn't belong to the user.
				return false;
			}

			cardDao.delete(cardId);
		} catch (AppException e) {
			// do nothing

			return false;
		}

		return true;
	}

	public void saveOrUpdateWeddingCard(final WeddingCard card) {
		try {
			if (card != null) {
				// saving card must be after saving place.
				cardDao.saveOrUpdate(card);
				
				List<Photo> photos = card.getPhotos();
				if (photos != null && photos.size() > 0) {
					for (Photo photo : photos) {
						photo.setWeddingCard(card);
						photoDao.saveOrUpdate(photo);
					}
				}
			}
		} catch (AppException e) {
			// do nothing
		}
	}

	public List<Photo> findPhotosByCardId(final long cardId) {
		List<Photo> photos = null;
		try {
			photos = photoDao.findPhotosByCardId(cardId);
		} catch (AppException e) {
			// do nothing
		}

		return photos;
	}

	public void saveOrUpdatePhoto(final Photo photo, final long cardId) {
		if (photo == null) {
			return;
		}

		try {
			photoDao.saveOrUpdate(photo);
		} catch (AppException e) {
			// do nothing
		}
	}
}
