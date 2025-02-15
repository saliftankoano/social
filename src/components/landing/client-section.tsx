import Image from "next/image";

export default function ClientSection() {
  return (
    <section
      id="clients"
      className="mx-auto max-w-[80rem] px-6 text-center md:px-8"
    >
      <div className="py-14">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h2 className="text-center text-sm font-semibold text-gray-600">
            TRUSTED BY TEAMS FROM AROUND THE WORLD
          </h2>
          <div className="mt-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-white">
              <li>
                <Image
                  src={`https://nogood.io/wp-content/uploads/2024/04/logo__no-good-yellow.svg`}
                  className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  alt="Google"
                  width={100}
                  height={100}
                />
              </li>
              <li>
                <Image
                  src={`https://cdn.prod.website-files.com/666741f97a0451dfa349bbc9/67a4a447772ba2374368ca3d_Goodie%20Logo%2BWordmark%20(1).svg`}
                  className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  alt="Microsoft"
                  width={100}
                  height={100}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
