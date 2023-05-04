package com.internshipproject.project.movie;

import java.sql.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateData {
    @CrossOrigin
    @RequestMapping(path = "movie/updateData", consumes = "application/json", method = RequestMethod.POST)
    public String updateData(@RequestBody Movie m1) {
        try {
            Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc", "root", "939231");
            Statement st = connect.createStatement();
            ResultSet result = st.executeQuery("select * from movie_list where title='" + m1.getTitle() + "'");
            while (result.next()) {
                String title = result.getString("title");
                st.executeUpdate(
                        "update movie_list set rating='" + m1.getRating() + "' where title='" + m1.getTitle()
                                + "';");

            }
            
            st.executeUpdate(
                    "insert into movie_list values('"
                            + m1.getRank()
                            + "','" + m1.getTitle() + "','" + m1.getThumbnail() + "','" + m1.getRating() + "','"
                            + m1.getYear()
                            + "','" + m1.getImage() + "','" + m1.getDescription() + "','" + m1.getTrailer() + "','"
                            + m1.getGenre() + "','" + m1.getDirector() + "','" + m1.getWriters() + "');");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return "success";
    }
}