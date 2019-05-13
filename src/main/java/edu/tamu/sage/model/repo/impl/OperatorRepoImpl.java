package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.BaseOp;
import edu.tamu.sage.model.repo.OperatorRepo;
import edu.tamu.sage.model.repo.custom.OperatorRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class OperatorRepoImpl extends AbstractWeaverRepoImpl<BaseOp, OperatorRepo> implements OperatorRepoCustom {

    @Override
    protected String getChannel() {
        return "/channel/operators";
    }
}
