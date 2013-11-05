package com.wqt.web.command;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wqt.model.Photo;
import com.wqt.model.User;
import com.wqt.model.WeddingCard;
import com.wqt.service.WeddingCardService;
import com.wqt.util.AppUtils;

/**
 * @author Jinde
 * @since 2013-10-10
 * 
 */
public class CopyWeddingCardCommand implements ICommand {

	private WeddingCardService weddingCardService = new WeddingCardService();

	/**
	 * 
	 */
	public CopyWeddingCardCommand() {
		// TODO Auto-generated constructor stub
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wqt.web.command.ICommand#execute(javax.servlet.http.HttpServletRequest
	 * , javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User user = (User) request.getSession().getAttribute("loginUser");

		WeddingCard card = null;

		String strCardId = request.getParameter("cid");
		if (!AppUtils.checkEmptyString(strCardId)) {
			long cardId = Long.valueOf(strCardId);
			card = weddingCardService.findWeddingCardWithPhotos(cardId);
			if (card == null || card.getUser().getUserId() != user.getUserId()) {
				CommandHelp.setErrorMessage(request,
						"Error: The card doesn't exist or belong to you.");
				return;
			}

			card.setCardId(-1);

			// save or update photos.
			List<Photo> photos = card.getPhotos();
			if (photos != null) {
				for (Photo photo : photos) {
					photo.setPhotoId(-1);
					photo.setWeddingCard(null);
				}
			}

			weddingCardService.saveOrUpdateWeddingCard(card);
		}
	}

}
