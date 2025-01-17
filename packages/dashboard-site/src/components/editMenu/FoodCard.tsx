import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import DeleteIcon from "@mui/icons-material/Delete";

import { useEditableMenu } from "~/context/EditableMenuContext";
import { MeniGlobals, cn } from "~/lib/hooks";

import EditableText from "~/components/editMenu/EditableText";
import { ImageUploader } from "~/components/uploader";

export type IFoodCardProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
};

export default function FoodCard(props: IFoodCardProps) {
  const { id, name, description, price, image, tags } = props;
  const { updateField, deleteFoodItem } = useEditableMenu();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const triggerInput = () => {
    document.getElementById(id)?.click();
  };

  return (
    <div className="group relative flex aspect-square w-full flex-col rounded bg-card sm:aspect-[3/1] sm:flex-row md:aspect-[20/5] lg:aspect-[25/10] xl:aspect-[25/10]">
      <div className="absolute left-2 top-2 z-10 hidden rounded-full bg-accent p-1 hover:cursor-pointer group-hover:block">
        <DeleteIcon
          sx={{ color: "#f7f7f7" }}
          onClick={() => deleteFoodItem(id)}
        />
      </div>
      <div
        className="relative aspect-square flex-none hover:cursor-pointer sm:w-48 lg:w-48"
        onClick={() => {
          if (image !== "") triggerInput();
        }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <ImageUploader
            updateField={updateField}
            foodItemId={id}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />
        </div>
        {image !== "" && (
          <Image
            src={MeniGlobals().cdnRoot + image}
            className={cn("rounded-l object-cover hover:opacity-25", {
              "opacity-25": isUploading,
            })}
            fill={true}
            alt="Food Item Image"
          />
        )}
      </div>
      <div className="flex w-full flex-col justify-between overflow-hidden break-words px-4 py-2 sm:h-full">
        <div className="flex w-full flex-1 grow flex-col gap-1 overflow-hidden">
          <div className="flex-none">
            <EditableText
              id={id}
              field="foodName"
              textClass="text-lg cursor-pointer"
            >
              {name}
            </EditableText>
          </div>
          <div className="w-full flex-initial grow overflow-y-auto scrollbar-hide">
            <EditableText
              id={id}
              field="foodDescription"
              textClass="text-sm font-thin cursor-pointer whitespace-pre-line break-normal"
            >
              {description}
            </EditableText>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-1">
          <ScrollContainer
            className="box-content flex h-fit flex-auto grow flex-nowrap items-center justify-between overflow-x-auto overflow-y-hidden py-1"
            vertical={false}
          >
            <EditableText
              id={id}
              field="foodTags"
              textClass="text-lg float-right"
              tags={tags}
            />
          </ScrollContainer>

          <div className="flex w-24 flex-row items-center justify-end">
            <div className="flex items-center justify-end">
              $
              <EditableText
                id={id}
                field="foodPrice"
                textClass="text-sm truncate cursor-pointer"
              >
                {price}
              </EditableText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
