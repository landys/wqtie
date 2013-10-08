package com.wqt.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wqt.model.Agent;
import com.wqt.util.AppException;

public class AgentDao extends AbstractBaseDao<Agent> {

	private static final String SqlPropPrefix = "Agent";

	public AgentDao() throws AppException {
		super();
	}

	public List<Agent> findAgentsInIds(List<Long> agentIds) throws AppException {
		String namePlace = "?";
		int n = agentIds.size();
		for (int i = 0; i < n - 1; i++) {
			namePlace += ", ?";
		}

		String sql = dbProps.getProperty("AgentFindAllInIds");
		sql = sql.replaceFirst("\\?", namePlace);

		List<Object> paras = new ArrayList<Object>();
		for (long agentId : agentIds) {
			paras.add(agentId);
		}

		return execFindObjects(sql, paras);
	}

	@Override
	protected long getId(Agent t) {
		return t.getAgentId();
	}

	@Override
	protected String getSqlPropPrefix() {
		return SqlPropPrefix;
	}

	@Override
	protected Agent parseRs(ResultSet rs) throws SQLException {
		if (rs == null) {
			return null;
		}

		Agent t = new Agent(rs.getLong("agentId"), rs.getString("name"),
				rs.getString("phone"), rs.getString("weixin"),
				rs.getString("weibo"), rs.getString("qq"),
				rs.getString("qcodePath"), rs.getString("address"),
				rs.getString("webSite"), rs.getDate("createDate"));

		return t;
	}

	@Override
	protected List<Object> convertToParaListWithoutId(Agent t) {
		List<Object> paras = new ArrayList<Object>();
		paras.add(t.getName());
		paras.add(t.getPhone());
		paras.add(t.getWeixin());
		paras.add(t.getWeibo());
		paras.add(t.getQq());
		paras.add(t.getQcodePath());
		paras.add(t.getAddress());
		paras.add(t.getWebSite());
		paras.add(t.getCreateDate());

		return paras;
	}

}
