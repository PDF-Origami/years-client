interface Props {
  year?: string;
}

export function Footer({ year }: Props) {
  return (
    <div className="flex">
      <p className="text-gray-500 text-xs">
        Made by{" "}
        <a href="https://twitter.com/PDFOrigami" className="text-blue-600">
          @PDFOrigami
        </a>
        {" • "}
        Source:{" "}
        <a
          href={`https://en.wikipedia.org/wiki/AD_${year}`}
          className="text-blue-600"
        >
          Wikipedia
        </a>
        {" • "}
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          className="text-blue-600"
        >
          Licence
        </a>
      </p>
      <p className="text-gray-500 text-xs"></p>
    </div>
  );
}
