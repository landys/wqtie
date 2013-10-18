package com.wqt.web.command;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wqt.model.Agent;
import com.wqt.model.Asset;
import com.wqt.model.Place;
import com.wqt.model.User;
import com.wqt.model.WeddingCard;
import com.wqt.service.WeddingCardService;
import com.wqt.util.AppUtils;
import com.wqt.util.AssetManager;

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

	/* (non-Javadoc)
	 * @see com.wqt.web.command.ICommand#execute(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User user = (User)request.getSession().getAttribute("loginUser");

		String step = request.getParameter("step");
		boolean isSubmit = (step != null && step.equals("submit"));
		
		List<Asset> musics = AssetManager.findAllMusics();
		List<Asset> templates = AssetManager.findAllTemplates();
		List<Agent> agents = weddingCardService.findAllAgents();
		request.setAttribute("musics", musics);
		request.setAttribute("templates", templates);
		request.setAttribute("agents", agents);
		
		WeddingCard card = null;
		
		String strCardId = request.getParameter("cid");
		if (!AppUtils.checkEmptyString(strCardId)) {
			long cardId = Long.valueOf(strCardId);
			card = weddingCardService.findWeddingCard(cardId);
			if (card == null || card.getUser().getUserId() != user.getUserId()) {
				CommandHelp.setErrorMessage(request, "Error: The card doesn't exist or belong to you.");
				return;
			}
			
			if (!isSubmit) {
				request.setAttribute("weddingCard", card);
				return;
			}
		}
		else {
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
		card.setWeddingDate(AppUtils.simpleStringToDate(request.getParameter("wedding_date")));
		card.setWeddingDateDesc(request.getParameter("wedding_date_desc"));
		card.setNote(request.getParameter("note"));
		card.setStory(request.getParameter("story"));
		card.setVideo(request.getParameter("video"));
		card.setCreateDate(new Date());
		
		// place
		Place place = card.getPlace();
		if (place == null) {
			place = new Place();
			card.setPlace(place);
		}
		
		place.setName(request.getParameter("place_name"));
		place.setAddress(request.getParameter("place_address"));
		place.setPhone(request.getParameter("place_phone"));
		place.setUrl(request.getParameter("place_url"));
		
		// agent, only need to update the agent id.
		String strAgentId = request.getParameter("agent_id");
		if (!AppUtils.checkEmptyString(strAgentId)) {
			long agentId = Long.valueOf(strAgentId);
			Agent agent = new Agent(agentId);
			card.setAgent(agent);
		}
		
		// music
		String strMusicId = request.getParameter("music_id");
		if (!AppUtils.checkEmptyString(strMusicId)) {
			long musicId = Long.valueOf(strMusicId);
			Asset music = AssetManager.findMusicById(musicId);
			if (music == null) {
				music = musics.get(0);
			}
			card.setMusic(music);
		}
		
		// template
		String strTemplateId = request.getParameter("template_id");
		if (!AppUtils.checkEmptyString(strTemplateId)) {
			long templateId = Long.valueOf(strTemplateId);
			Asset template = AssetManager.findMusicById(templateId);
			if (template == null) {
				template = templates.get(0);
			}
			card.setMusic(template);
		}
		
		weddingCardService.saveOrUpdateWeddingCard(card);
		
		CommandHelp.setExecuteResult(request, "Success", null, null);
	}

}
