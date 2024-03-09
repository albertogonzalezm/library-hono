import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";

class Genre extends Model {}
Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Genre",
    timestamps: false,
    freezeTableName: true,
  }
);

export default Genre;
