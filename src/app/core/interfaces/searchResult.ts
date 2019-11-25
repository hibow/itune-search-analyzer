export interface SearchResults {
  feed: {
    entry: SearchEntries[];
  };
}

export interface SearchFeed {
  entry: SearchEntries[];
}
export interface SearchEntries {
  category: {
    attributes: {
      label: string;
      term: string;
    };
  };
  id: {
    attributes: {
      "im:id": string;
    };
    label: string;
  };
  "im:artist": {
    label: string;
  };
  "im:image": [{ label: string }, { label: string }, { label: string }];
  "im:name": {
    label: string;
  };
  "im:price": {
    label: string;
  };
  "im:collection": {
    "im:name": {
      label: string;
    };
  };
  "im:releaseDate": {
    attributes: {
      label: string;
    };
    label: string;
  };
  rights: {
    label: string;
  };
  title: {
    label: string;
  };
  link: [
    {
      attributes: {
        href: string;
        type: string;
      };
    },
    {
      attributes: {
        href: string;
        type: string;
      };
    }
  ];
}
