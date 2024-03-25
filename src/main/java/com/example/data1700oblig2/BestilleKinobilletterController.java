package com.example.data1700oblig2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
@RestController
public class BestilleKinobilletterController {
    private final List<Billett> billetter = new ArrayList<>();
    @PostMapping("/lagre")
    public void lagreBillett(Billett nybillett){
        billetter.add(nybillett);
    }
    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){
        return billetter;
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        billetter.clear();
    }
}
