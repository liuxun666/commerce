'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col rounded-lg border border-neutral-200 p-8 md:p-12 dark:border-neutral-800 bg-gradient-to-br from-shanfan-50 via-shanfan-100 to-fuguang-50 dark:from-yuepo-950 dark:via-yuepo-900 dark:to-shanfan-950">
      <h2 className="text-xl font-bold">Oh no!</h2>
      <p className="my-2">
        There was an issue with our storefront. This could be a temporary issue, please try your
        action again.
      </p>
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
