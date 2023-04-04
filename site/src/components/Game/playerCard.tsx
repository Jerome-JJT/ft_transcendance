import { UserDto } from "src/_shared_dto/user.dto";
import LogoInconnu from "../../assets/img/inconnu.jpeg";

interface userCardProps {
  id: number;
  user?: UserDto;
}

export default function PlayerCard(props: userCardProps) {
  let userId = "";
  let css = "";
  let position = "";
  let end = "";

  if (props.id === 2) {
    userId = "2";
    css = "mr-0 ml-auto";
    position = "order-last";
    end = "justify-end";
  }

  return (
    <>
      <img
        className={`h-12 w-12 rounded-full object-cover ${position}`}
        src={props.user?.avatar_url || LogoInconnu}
        alt={`Player-${props.user?.pseudo}`}
      />
      <div className="flex-1 px-3">
        <span className={`flex ${end}`}>{props.user?.pseudo}</span>
        <div
          id={`myProgress${userId}`}
          className="border border-black bg-slate-200"
        >
          <div
            id={`myBar${userId}`}
            className={`h-8 bg-green-500 ${css}`}
          ></div>
        </div>
      </div>
    </>
  );
}
