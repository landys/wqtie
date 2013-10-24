package com.wqt.web.command;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
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
public class EditWeddingCardCommand implements ICommand {

	private WeddingCardService weddingCardService = new WeddingCardService();

	/**
	 * 
	 */
	public EditWeddingCardCommand() {
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

		String step = request.getParameter("step");
		boolean isSubmit = (step != null && step.equals("submit"));

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

			if (!isSubmit) {
				request.setAttribute("weddingCard", card);
				return;
			}
		} else {
			if (!isSubmit) {
				// go to the page to create wedding card with empty form.
				return;
			}
			card = new WeddingCard();
		}

		card.setUser(user);

		card.setTitle(request.getParameter("title"));
		card.setGroom(request.getParameter("groom"));
		card.setBride(request.getParameter("bride"));
		card.setCoverPhotoUrl(request.getParameter("cover_photo_url"));
		card.setPagePhotoUrl(request.getParameter("page_photo_url"));
		//card.setWeddingDate(AppUtils.simpleStringToDate(request.getParameter("wedding_date")));
		card.setWeddingDateDesc(request.getParameter("wedding_date_desc"));
		card.setPlaceName(request.getParameter("place_name"));
		card.setPlaceAddress(request.getParameter("place_address"));
		card.setPlacePhone(request.getParameter("place_phone"));
		card.setPlaceLongitude(request.getParameter("place_longitude"));
		card.setPlaceLatitude(request.getParameter("place_latitude"));
		card.setNote(request.getParameter("note"));
		card.setStory(request.getParameter("story"));
		card.setMusicUrl(request.getParameter("music_url"));
		card.setVideoUrl(request.getParameter("video_url"));
		card.setAgentName(request.getParameter("agent_name"));
		card.setAgentWeixin(request.getParameter("agent_weixin"));
		card.setAgentQcodePath(request.getParameter("agent_qcode_path"));
		card.setAgentWebsite(request.getParameter("agent_website"));
		card.setCreateDate(new Date());

		// save or update photos.
		List<Photo> photos = card.getPhotos();
		if (photos == null) {
			photos = new ArrayList<Photo>();
			card.setPhotos(photos);
		}

		for (int i = 0; i < 8; ++i) {
			String photoUrl = request.getParameter("p" + (i + 1));
			if (photos.size() > i) {
				Photo photo = photos.get(i);
				photo.setUrl(photoUrl);
			} else {
				if (!AppUtils.checkEmptyString(photoUrl)) {
					Photo photo = new Photo();
					photo.setUrl(photoUrl.trim());
					photos.add(photo);
				}
			}
		}

		weddingCardService.saveOrUpdateWeddingCard(card);

		CommandHelp.setExecuteResult(request, "Success", null, null);
	}

}
