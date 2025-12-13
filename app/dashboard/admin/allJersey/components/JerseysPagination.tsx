"use client";
const JerseysPagination = ({ page, setPage, totalPages,
}: { page: number; setPage: (p: number) => void; totalPages: number;
}) => {
  return (
    <div className="flex justify-center gap-4 my-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border border-blue-600 hover:bg-blue-600 hover:text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-3 py-1 border rounded">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border border-blue-600 hover:bg-blue-600 hover:text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default JerseysPagination;
