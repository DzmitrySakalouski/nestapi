import { UserDto } from "src/users/model/user.dto";
import { User } from "src/users/model/user.models";

export const toUserDto = (data: User): UserDto => {
    const {id, firstName, lastName, email} = data;
    let userDto: UserDto = {id, firstName, lastName, email};
    return userDto;
}