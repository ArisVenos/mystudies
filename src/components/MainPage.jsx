import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import book from "..//images/book.jpg";
import certificate from "..//images/certificate.jpg";
import grade from "..//images/grade.jpg";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const MainPage = () => {
    return (
        <Flex justifyContent="center" alignItems="center" marginTop="30px">
            <div id="carouselExampleCaptions" className="carousel slide" style={{ width: '1000px' , height: '600px' }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Image src={book} className="d-block w-100" alt="First slide" style={{ objectFit: 'cover', height: '500px' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3 style={{color: 'white' , fontWeight: 'bold'}}>ΔΗΛΩΣΕΙΣ</h3>
                            <p style={{color: 'white', fontWeight: 'bold'}}>Δηλώστε τα μαθήματα σας για το τρέχον εξάμηνο.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <Image src={grade} className="d-block w-100" alt="Second slide" style={{ objectFit: 'cover', height: '500px' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3 style={{color: 'black' , fontWeight: 'bold'}}>ΒΑΘΜΟΛΟΓΙΕΣ</h3>
                            <p style={{color: 'black' , fontWeight: 'bold'}}>Δείτε τις βαθμολογίες σας για τα μαθήματα που έχετε εξεταστεί.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <Image src={certificate} className="d-block w-100" alt="Second slide" style={{ objectFit: 'cover', height: '500px' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h3 style={{color: 'black' , fontWeight: 'bold'}}>ΠΙΣΤΟΠΟΙΗΤΙΚΑ</h3>
                            <p style={{color: 'black' , fontWeight: 'bold'}}>Κάντε αίτηση πιστοποιητικών για τις σπουδές σας.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </Flex>
    );
}

export default MainPage;
