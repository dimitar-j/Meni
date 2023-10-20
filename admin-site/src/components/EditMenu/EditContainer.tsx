import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link } from "react-scroll";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import MeniGlobals from "~/MeniGlobals";
import { EditMode, useEditableMenu } from "~/context/EditableMenuContext";
import { useMeniContext } from "~/context/meniContext";

import EditableText from "~/components/EditMenu/EditableText";
import FoodCard from "~/components/EditMenu/FoodCard";
import MeniButton from "~/components/items/MeniButton";
import MeniDialog from "~/components/items/MeniDialog";
import MeniNotification from "~/components/items/MeniNotification";

type EditContainerProps = {
  menuId: string;
};

type IRestaurant = {
  restaurantName: string;
  address: string;
  restaurantPhoneNumber: string;
  description: string;
  restaurantImage: string;
};
export default function EditContainer(props: EditContainerProps) {
  const {
    editableMenuState,
    setMenuLoading,
    loadNewTemplate,
    loadFromAPI,
    addCategory,
    addSubCategory,
    addFoodItem,
    deleteCategory,
    deleteSubCategory,
    setCurrentEditId,
  } = useEditableMenu();
  const { userInfo, beginLoad, endLoad } = useMeniContext();

  const [startGuide, setStartGuide] = useState(false);
  const [restaurant, setRestaurant] = useState<IRestaurant>({
    restaurantImage: "",
    restaurantPhoneNumber: "",
    address: "",
    description: "",
    restaurantName: "",
  } as IRestaurant);

  const router = useRouter();
  const { menuId } = props;

  // create new Menu
  const createNewMenu = () => {
    if (router.query.restaurantId) {
      setStartGuide(true);
      loadNewTemplate(router.query.restaurantId as string);
    }
  };

  // Load menu
  const loadMenu = () => {
    return;
    // if (userInfo) {
    //   beginLoad();
    //   const loadMenuParams = new URLSearchParams({
    //     menuId: props.menuId,
    //   });
    //   fetch(MeniGlobals().apiRoot + "/load-menu?" + loadMenuParams, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${userInfo.meniToke}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //       loadFromAPI(result);
    //       loadRestaurant(result.restaurantId);
    //       endLoad();
    //     })
    //     .catch(() => {
    //       MeniNotification("Error", "Could not load menu", "error");
    //       endLoad();
    //     });
    // }
  };

  // Load restaurant
  const loadRestaurant = (restaurantId: string) => {
    return;
    // beginLoad();
    // await fetch(
    //   MeniGlobals().apiRoot +
    //     "/get-restaurant?" +
    //     new URLSearchParams({ restaurantId: restaurantId as string }),
    // )
    //   .then((response) => {
    //     if (response.status === 200) {
    //       return response.json();
    //     } else {
    //       throw Error();
    //     }
    //   })
    //   .then((result) => {
    //     setRestaurant(result);
    //     endLoad();
    //   })
    //   .catch(() => {
    //     MeniNotification("Error", "Could not load menu", "error");
    //     endLoad();
    //   });
  };

  useEffect(() => {
    if (menuId) {
      setMenuLoading(true);
      if (menuId === "new") {
        createNewMenu();
        if (router.query.restaurantId) {
          loadRestaurant(router.query.restaurantId as string);
        }
      } else {
        loadMenu();
      }
    }
  }, [menuId, userInfo, router.query.restaurantId]);

  // Save/Create
  const saveMenu = () => {
    return;
    // if (userInfo) {
    //   beginLoad();
    //   if (editableMenuState.mode == EditMode.CREATE) {
    //     await fetch(MeniGlobals().apiRoot + "/create-menu", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${userInfo.meniToke}`,
    //       },
    //       body: JSON.stringify({ ...editableMenuState.menu }),
    //     })
    //       .then((response) => response.json())
    //       .then((result) => {
    //         router.push("/edit/" + result.id);
    //         MeniNotification(
    //           "Created",
    //           "Your menu was created succesfully",
    //           "success",
    //         );
    //         endLoad();
    //       })
    //       .catch(() => {
    //         MeniNotification("Error", "Could not create menu", "error");
    //         endLoad();
    //       });
    //   } else {
    //     await fetch(MeniGlobals().apiRoot + "/update-menu", {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${userInfo.meniToke}`,
    //       },
    //       body: JSON.stringify({ ...editableMenuState.menu }),
    //     })
    //       .then((response) => response.json())
    //       .then((result) => {
    //         MeniNotification(
    //           "Saved",
    //           "Your menu was saved succesfully",
    //           "success",
    //         );
    //         endLoad();
    //       })
    //       .catch(() => {
    //         MeniNotification("Error", "Could not save menu", "error");
    //         endLoad();
    //       });
    //   }
    // }
  };

  const handleSubCategoryDelete = (subCategoryId: string) => {
    deleteSubCategory(subCategoryId);
  };

  const handleCategoryDelete = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  const openCategoryForEdit = (categoryId: string) => {
    setCurrentEditId(categoryId);
  };

  const renderSaveBar = () => {
    return (
      <div className="fixed top-0 z-30 flex w-full justify-between gap-24 bg-card/50 px-10 py-5 backdrop-blur-lg xs:gap-2 md:gap-16">
        <div className="flex items-center gap-4 font-serif text-xl">
          <ArrowBackIosIcon
            className="cursor-pointer"
            onClick={() => void router.push("/dashboard")}
          />
          {editableMenuState.menu.name}
        </div>
        <div className="flex gap-6 font-sans sm:gap-16">
          <button onClick={() => void router.push("/dashboard")}>
            <div className="flex items-center justify-center gap-2">
              <ClearIcon></ClearIcon>
              <div className="hidden sm:block">Cancel</div>
            </div>
          </button>
          <button
            onClick={saveMenu}
            className="flex items-center justify-center gap-2 rounded-sm border border-white p-2"
          >
            <SaveIcon></SaveIcon>
            <div className="hidden sm:block">
              {editableMenuState.mode === EditMode.CREATE ? "Create" : "Save"}
            </div>
          </button>
        </div>
      </div>
    );
  };

  const renderNewMenuDialog = () => {
    return (
      <MeniDialog open={startGuide} onClose={() => setStartGuide(false)}>
        <div className="flex flex-col gap-8 bg-card p-6 text-white">
          <h1 className="font-serif text-xl">New Menu</h1>
          <div className="flex flex-col gap-2">
            <p className="font-thin">Start cooking your menu!</p>
          </div>
          <div className="flex justify-end">
            <MeniButton onClick={() => setStartGuide(false)}>Start!</MeniButton>
          </div>
        </div>
      </MeniDialog>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <div className="mt-20 grid gap-4 font-sans">
          <h1 className="font-serif text-6xl text-white">
            {restaurant.restaurantName}
          </h1>
          <p className="font-thin">{restaurant.description} </p>
          <div className="flex gap-2">
            <Image
              width={20}
              height={20}
              alt="location icon"
              src="/menupage/location.svg"
            ></Image>
            <p className="font-thin">{restaurant.address}</p>
          </div>
          <div className="flex gap-2">
            <Image
              width={20}
              height={20}
              alt="location icon"
              src="/menupage/phone.svg"
            ></Image>
            <a href="tel:403-231-8933" className="font-thin">
              {restaurant.restaurantPhoneNumber}
            </a>
          </div>
        </div>
      </>
    );
  };

  return !editableMenuState.loading ? (
    <>
      {renderSaveBar()}
      <div className="h-full w-full items-center justify-center p-10 font-sans text-white">
        <div className="m-auto grid h-fit max-w-[1460px] gap-4 xl:w-4/5">
          <div className="grid gap-4 ">
            {renderHeader()}
            <div className="relative overflow-hidden">
              {renderNewMenuDialog()}
              <ScrollContainer className="sticky top-0 z-10 flex w-full gap-16 overflow-x-scroll border-t bg-backdrop py-4 align-middle text-xl font-thin">
                {editableMenuState.menu.mainCategories.map(
                  (category, index) => (
                    <div className="group" key={index}>
                      <Link
                        activeClass="font-bold 
          before:scale-x-100 "
                        className={`before:duration-300r relative
                        flex cursor-pointer justify-center gap-2 whitespace-nowrap before:absolute before:bottom-0 before:left-0 before:block 
          before:h-[2px] before:w-full before:origin-top-left
          before:scale-x-0 before:bg-white
          before:transition before:ease-in-out before:content-[''] ${
            index === 0 ? "ml-auto" : ""
          }`}
                        key={category.id}
                        smooth
                        spy
                        to={category.id}
                      >
                        {category.name}
                        <div
                          className="z-10 -mt-0.5 hover:cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryDelete(category.id);
                          }}
                        >
                          <DeleteIcon
                            sx={{
                              color: "#f7f7f7",
                              height: "20px",
                              width: "20px",
                            }}
                          />
                        </div>
                      </Link>
                    </div>
                  ),
                )}
                <div
                  className="relative mr-auto cursor-pointer whitespace-nowrap text-xl text-[#808082]"
                  onClick={addCategory}
                >
                  + Category
                </div>
              </ScrollContainer>
              <div className="my-8 flex flex-col">
                {editableMenuState.menu.mainCategories.map(
                  (category, index1) => {
                    return (
                      <section
                        id={category.id}
                        key={index1}
                        className="w-full border-white "
                      >
                        <EditableText
                          id={category.id}
                          textClass="font-serif text-5xl"
                        >
                          {category.name}
                        </EditableText>
                        <div className="mt-8 flex flex-col gap-16">
                          {category.subCategories.map((subCategory, index2) => {
                            return (
                              <div className="grid gap-8" key={index2}>
                                <div className="group relative flex w-fit items-center gap-4">
                                  <EditableText
                                    id={subCategory.id}
                                    textClass="text-2xl font-medium font-sans"
                                  >
                                    {subCategory.name}
                                  </EditableText>
                                  <div
                                    className="border p-2 hover:cursor-pointer"
                                    onClick={() =>
                                      handleSubCategoryDelete(subCategory.id)
                                    }
                                  >
                                    <DeleteIcon
                                      sx={{
                                        color: "#f7f7f7",
                                        height: "20px",
                                        width: "20px",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                  {subCategory.items.map((item, index3) => {
                                    return (
                                      <FoodCard
                                        key={index3}
                                        id={item.id}
                                        title={item.name}
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                        tags={item.tags}
                                      />
                                    );
                                  })}
                                  <div
                                    className="relative flex aspect-square flex-col items-center justify-center border-2 border-dashed border-accent hover:cursor-pointer sm:aspect-[6/1] sm:flex-row md:aspect-[20/5] lg:aspect-[25/10] xl:aspect-[25/10] "
                                    onClick={() => addFoodItem(subCategory.id)}
                                  >
                                    {/* <span>
                            <AddIcon sx={{ color: "#808082" }} />
                          </span>{" "} */}
                                    <span className="text-3xl text-accent">
                                      + Food Item
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="relative mb-8 flex h-16 w-full flex-col items-center justify-center border-2 border-dashed border-accent hover:cursor-pointer sm:flex-row lg:aspect-[30/10]">
                            {/* <span>
                    <AddIcon className="text-3xl text-gray-600" />
                  </span>{" "} */}
                            <span
                              className="text-3xl text-accent"
                              onClick={() => addSubCategory(category.id)}
                            >
                              + Sub Category
                            </span>
                          </div>
                        </div>
                      </section>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="relative m-auto h-fit w-1/5">Loading</div>
  );
}