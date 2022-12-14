import React, { useCallback } from "react";
import { FC } from "react";
import styled from "styled-components";
import { Paginator } from "@vtaits/react-paginator";
import { Sort, ListState } from "@vtaits/filterlist";

import Filters from "./Filters";
import Table from "./Table";
import ItemsPerPage from "./ItemsPerPage";
import Preloader from "./Preloader";
import TotalCount from "./TotalCount";

import { User } from "../types";

type Props = {
  listState: ListState;
  filters: Record<string, any>;
  sort: Sort;
  items: User[];
  additional?: {
    count: number;
  };
  loading: boolean;
  setFilterValue: (filterName: string, value: any) => void;
  resetFilter: (filterName: string) => Promise<void>;
  applyFilter: (filterName: string) => Promise<void>;
  setAndApplyFilter: (filterName: string, value: any) => Promise<void>;
  resetAllFilters: () => Promise<void>;
  setSorting: (param: string) => void;
};

const StyledWrapper = styled.div({
  display: "flex",
  alignItems: "flex-start"
});

const StyledView = styled.div({
  maxWidth: 900
});

const StyledListStateWrapper = styled.div({
  paddingLeft: 40
});

const StyledListStateTitle = styled.div({
  fontSize: 24,
  lineHeight: 1.2,
  marginBottom: 20
});

const StyledListState = styled.pre({
  boxSizing: "border-box",
  backgroundColor: "#efefef",
  width: 600,
  height: 600,
  padding: 15,
  overflow: "auto"
});

const StyledTotalCountBlock = styled.div({
  marginBottom: 20,
  height: 22
});

const StyledBottomBlock = styled.div({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 30
});

const Page: FC<Props> = ({
  listState,
  filters,
  sort,
  items,
  additional,
  loading,
  resetAllFilters,
  setFilterValue,
  resetFilter,
  applyFilter,
  setAndApplyFilter,
  setSorting
}) => {
  const onPageChange = useCallback(
    (page: number): void => {
      setAndApplyFilter("page", page);
    },
    [setAndApplyFilter]
  );

  const perPage = filters.perPage || 10;

  return (
    <StyledWrapper>
      <StyledView>
        <Filters
          filters={filters}
          resetAllFilters={resetAllFilters}
          setFilterValue={setFilterValue}
          resetFilter={resetFilter}
          applyFilter={applyFilter}
        />

        <StyledTotalCountBlock>
          {additional && <TotalCount count={additional.count} />}
        </StyledTotalCountBlock>

        <Table items={items} sort={sort} setSorting={setSorting} />

        {loading && <Preloader />}

        <StyledBottomBlock>
          <div>
            {additional && additional.count > 0 && (
              <Paginator
                page={filters.page || 1}
                pageCount={Math.ceil(additional.count / perPage)}
                onPageChange={onPageChange}
              />
            )}
          </div>

          <ItemsPerPage
            name="perPage"
            value={filters.perPage}
            setAndApplyFilter={setAndApplyFilter}
          />
        </StyledBottomBlock>
      </StyledView>

      <StyledListStateWrapper>
        <StyledListStateTitle>
          Current state of filterlist:
        </StyledListStateTitle>

        <StyledListState>{JSON.stringify(listState, null, 2)}</StyledListState>
      </StyledListStateWrapper>
    </StyledWrapper>
  );
};

Page.defaultProps = {
  additional: null
};

export default Page;
