import React from "react";
import { Pagination } from "@patternfly/react-core";

export const TC069_PaginationMarkup: React.FC = () => (
  <Pagination itemCount={100} perPage={20} page={1} onSetPage={() => {}} onPerPageSelect={() => {}} />
);
