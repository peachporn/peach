import { db } from "@peach/database";

const settings = () => db.query.settings.findFirst();
