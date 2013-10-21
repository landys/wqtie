package com.wqt.web.command;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wqt.model.Photo;
import com.wqt.model.User;
import com.wqt.service.WeddingCardService;
import com.wqt.util.AppUtils;

/**
 * @author Jinde
 * @since 2013-10-14
 *
 */
public class EditPhotosCommand implements ICommand {

	private WeddingCardService weddingCardService = new WeddingCardService();
	
	/**
	 * 
	 */
	public EditPhotosCommand() {
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see com.wqt.web.command.ICommand#execute(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		final User user = (User) request.getSession().getAttribute("loginUser");
		final long userId = user.getUserId();
		
		String strCardId = request.getParameter("cid");
		if (!AppUtils.checkEmptyString(strCardId)) {
			long cardId = Long.valueOf(strCardId);
			
			List<Photo> assets = weddingCardService.findPhotosByCardId(cardId);
			
			if (assets != null && assets.size() > 0) {
				request.setAttribute("photos", assets);
			}
		}
		
	}

}
