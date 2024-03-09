import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";

class BookGenre extends Model {}
BookGenre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: "BookGenre",
    timestamps: false,
    freezeTableName: true,
  }
);

export default BookGenre;
