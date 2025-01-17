import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { api } from "~/utils/api";

import MenuCard from "~/components/MenuCard/MenuCard";
import { LoadingPage } from "~/components/loadingPage";

export default function Restaurant() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromQrScan = searchParams.get("qr");

  const { restaurantId } = router.query;
  const { data, isLoading } = api.restaurant.getRestaurantMenus.useQuery(
    restaurantId as string,
    {
      enabled: true,
      initialData: {
        restaurantName: "",
        menus: [],
      },
    },
  );

  const NavBar = () => {
    return (
      <>
        <Head>
          <title>{`${data.restaurantName} | Meni`}</title>
        </Head>
        {!fromQrScan && (
          <div className="align-center flex w-full flex-row gap-4 p-8 font-sans">
            <ArrowBackIosIcon
              className="left-6 top-6 cursor-pointer"
              onClick={() => void router.push("/")}
            />
            <div className="font-serif text-xl">{data.restaurantName}</div>
          </div>
        )}
      </>
    );
  };

  if (isLoading) return <LoadingPage />;
  if (!data.menus.length) {
    return (
      <div className="flex h-screen w-full flex-col">
        {NavBar()}
        <div className="flex w-full flex-1 items-center justify-center font-sans">
          No active menus found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col">
      {NavBar()}
      <div className="flex w-full flex-1 flex-col overflow-auto md:flex-row">
        {data.menus?.map((menu, index) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            index={index}
            restaurantId={restaurantId as string}
          />
        ))}
      </div>
    </div>
  );
}
