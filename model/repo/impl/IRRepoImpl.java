package edu.tamu.cap.model.repo.impl;

import edu.tamu.cap.model.IR;
import edu.tamu.cap.model.repo.IRRepo;
import edu.tamu.cap.model.repo.custom.IRRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class IRRepoImpl extends AbstractWeaverRepoImpl<IR, IRRepo> implements IRRepoCustom {
	@Override
	protected String getChannel() {
		return "/channel/ir";
	}
}