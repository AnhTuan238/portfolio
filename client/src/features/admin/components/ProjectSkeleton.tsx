export const ProjectSkeleton = () => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index}>
          <div className="rounded-md shadow-md bg-gray-200 w-full h-125" />
        </li>
      ))}
    </ul>
  );
};
