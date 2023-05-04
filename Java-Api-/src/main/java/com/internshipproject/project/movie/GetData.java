package com.internshipproject.project.movie;

import java.sql.*;
import java.util.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

class compare implements Comparator<Movie>
{
    public int compare(Movie m1, Movie m2)
    {
        return m2.getRating().compareTo(m1.getRating());
    }
}

@RestController
public class GetData {
    @CrossOrigin
    @GetMapping("movie/getData")
    public ArrayList<Movie> getData()
    {
        ArrayList<Movie> response = new ArrayList<>();
        try {
            Connection connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc", "root", "939231");
            Statement st = connect.createStatement();
            ResultSet result = st.executeQuery("select * from movie_list");
            while (result.next()) {
                Movie m1=new Movie();
                m1.rank=result.getString("rank");
                m1.title=result.getString("title");
                m1.thumbnail=result.getString("thumbnail");
                m1.rating=result.getString("rating");
                m1.year=result.getString("year");
                m1.image=result.getString("image");
                m1.description=result.getString("description");
                m1.trailer=result.getString("trailer");
                m1.genre=result.getString("genre");
                m1.director=result.getString("director");
                m1.writers=result.getString("writers");
                response.add(m1);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        Collections.sort(response, new compare());
        return response;
    }
}
