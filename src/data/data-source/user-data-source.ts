import { User } from "../entity/User";
import { GenericDataSource } from "./generic-data-source/generic-data-source";

export class UserDataSource extends GenericDataSource<User> {
    /**
     *
     */
    constructor() {
        super(User);
    }
}