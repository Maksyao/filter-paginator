import React, { memo, useCallback } from "react";
import { FC, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { definition as faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons/faLongArrowAltDown";
import { definition as faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons/faLongArrowAltUp";

import styled from "styled-components";

const StyledTh = styled.th({
  cursor: "pointer",
  color: "blue",
  borderBottom: "2px solid #ccc",
  padding: "5px 10px",
  textAlign: "left",
  outline: "none",
  whiteSpace: "nowrap",

  "&:hover": {
    textDecoration: "underline"
  },

  "&:active": {
    opacity: 0.75
  },

  "& + &": {
    borderLeft: "1px solid #ccc"
  }
});

const StyledText = styled.span({
  marginRight: 5
});

type Props = {
  param: string;
  current?: string;
  asc?: boolean;
  children?: ReactNode;

  setSorting: (param: string) => void;
};

const Th: FC<Props> = memo(({ param, current, asc, children, setSorting }) => {
  const onClick = useCallback((): void => {
    setSorting(param);
  }, [param, setSorting]);

  return (
    <StyledTh onClick={onClick} role="button" tabIndex={0}>
      <StyledText>{children}</StyledText>

      {param === current && (
        <FontAwesomeIcon icon={asc ? faLongArrowAltDown : faLongArrowAltUp} />
      )}
    </StyledTh>
  );
});

Th.defaultProps = {
  asc: null,
  current: null,
  children: null
};

export default Th;
