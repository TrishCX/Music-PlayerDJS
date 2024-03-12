export const SPOTIFY = {
  TRACKS: {
    SEARCH: (searchTerm: string, offSet?: number) =>
      `https://api-partner.spotify.com/pathfinder/v1/query?operationName=searchTracks&variables=%7B%22searchTerm%22%3A%22${encodeURIComponent(
        searchTerm
      )}%22%2C%22offset%22%3A0%2C%22limit%22%3A${
        !offSet ? encodeURIComponent(5) : encodeURIComponent(offSet)
      }%2C%22numberOfTopResults%22%3A20%2C%22includeAudiobooks%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22875aaad13da3b8cebc0951584343999525b242d3a6a45caf33423bbf6f027af3%22%7D%7D`,
    TOP: (searchTrack: string) =>
      `https://api-partner.spotify.com/pathfinder/v1/query?operationName=searchDesktop&variables=%7B%22searchTerm%22%3A%22${encodeURIComponent(
        searchTrack
      )}%22%2C%22offset%22%3A0%2C%22limit%22%3A10%2C%22numberOfTopResults%22%3A5%2C%22includeAudiobooks%22%3Atrue%2C%22includeArtistHasConcertsField%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22c8e90ff103ace95ecde0bcb4ba97a56d21c6f48427f87e7cc9a958ddbf46edd8%22%7D%7D`,
    GET: (trackID: string) =>
      `https://api-partner.spotify.com/pathfinder/v1/query?operationName=getTrack&variables=%7B%22uri%22%3A%22spotify%3Atrack%3A${encodeURIComponent(
        trackID
      )}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22ae85b52abb74d20a4c331d4143d4772c95f34757bfa8c625474b912b9055b5c0%22%7D%7D`,
  },
};
