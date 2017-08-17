import React, { Component } from 'react'
import Comment from './Comment'
import TriangleUp from 'react-icons/lib/go/triangle-up';
import TriangleDown from 'react-icons/lib/go/triangle-down';

class BlogPage extends Component {

    render() {
        return (
            <div className="blog container">
                <h1>
                    Introduction to Google Test with Xcode 6 and C++11
                </h1>
                <p className="metadata"> posted on 2016-12-16 17:47 by Author </p>

                <div className="blog-body row">

                    <div className="col-md-2" />

                    <article className="col-md-8">
                        Google Test (gtest) is a test framework for C++ applications on a variety of plattforms. The latest official guide for Google Test was written by Google in 2011. This was the time of OS X Snow Leopard and Xcode 3. Now we are almost four years and three major releases of Xcode ahead. Tremendous changes were made by Apple on the user-interface and under the hood of Xcode. And at this point of time there is still a no up to date Google Test guide for Xcode, especially for the new Xcode 6 in conjunction with the C++11 standard. In one of my C++ projects I had to use the Google Test framework, so this guide will show the right way to integrate the test framework in your C++ project.
1. First of all download the latest release of Google Test. In my case this is 1.7.0.
2. Unzip the archive and execute the Xcode project gtest.xcodeproj . Located in
gtest-1.7.0/xcode .
3. Select the gtest project in the project navigator and in the next step the
gtest-framework as your target. After that click on the Build Settings .

<br />  <br />  <br />
                        Dear Valued Customer:
 Enclosed is your Renters Insurance policy. This package will give you complete details of the coverage provided by your policy. Please review it carefully to determine if it meets your current insurance needs.
Important: Your billing notice will be sent closer to the due date.
For your convenience, this policy and any future renewal policies will automatically be applied to your current billing method. You will receive an invoice or a schedule of future payment due dates for credit card or ACH transactions under separate cover.
If you need to obtain policy status information or if you have any questions or changes to your policy, you can reach us in one of the following ways:
Manage Your Policy at: www.myassurantpolicy.com
Phone number: 1-800-432-8612 to reach our 24-hour automated Renters Information Line and to reach one of our customer service representatives who are available between 8:00 a.m. and 8:00 p.m. ET, Monday through Friday.
MOVING? Make sure to contact us with your address change to ensure continuous coverage of your personal property.
You can rest assured that by keeping your policy active you will have the security of knowing that your valuable items will continue to be protected.
Thank you for allowing us the opportunity to serve you! Insurance Service Center

<br />  <br />  <br />
                        Notes for Amanda
September 7, 2016


•	The definition of the real exchange rate is:  P/EP*, where P is the price of the domestic economy, E is units of domestic currency per unit of foreign currency, and P* is the price of the foreign country.  In our previous estimations, P* was the price of the United States and E is units of the domestic currency per US dollar.
•	Now, P* and E are going to be trade weighted indices of prices and exchange rates of the main trading countries.

                                                                                                                                                          (1)
Where is units of domestic currency per unit of currency of country i.
We can also write  in terms of the exchange rate vis-a-vis some currency standard (say the US dollar, the British pound, or the German mark).
 will be equal to:
units of domestic currency per US dollar × units of US dollars per country i domestic currency.  For example if   is equal to Argentine pesos/Brazilian real, it can be re-written as:
Argentine Pesos per US dollar × US dollars per Brazilian real = (A$/USD) × (USD/BR).
Thus we can rewrite the real exchange rate in (1) as follows:
                                                                                                                                                   (2)
Where  is the US Dollar/country i exchange rate and E is the domestic currency per US dollar of the country for which we are estimating the real exchange rate.
We write the real exchange rate in this way because when examining the impact of the devaluation in the real depreciation, we do not want to look at the multilateral nominal exchange rate but we would like to look at the impact of the devaluation of the domestic currency vis-à-vis the currency of the country to which the domestic country is pegging the exchange rate.  So, during the gold standard period in the 19th century, most of the countries were pegging vis-à-vis the British pound, the E will be the domestic currency per British pound and is the British Pound/country i exchange rate.  Please note, that we will need to convert all the exchange rates into indices with base equal to 1 in 2009.
To start, we will need to construct three indices for each country, one vis-à-vis the British pound, one vis-à-vis the US dollar, and one vis-à-vis the German mark.
•	We do not have just one set of trade weights for each country for the whole sample.  So, for each set of weights, we will need to construct another real exchange rate index.  Say one with the weights for 1965, another for 1975, …….
•	The question is how to combine these indices.  Perhaps the weights change a lot.  We do not want to have abrupt changes in the real exchange rate in the year in which we change the weights.  Thus, we need to smooth this transition.   Say that we have weights for 1830, 1850, 1870, etc.  We start with the index for 1830 and continue with this index until 1840.  Starting in 1841 we start giving increasing weights to the 1850 index.  Starting with 0.90 for index 1830 and 0.10 for index 1850 for the year 1841.   You will change the weights by increments of 0.10.  That is in 1849 you will give a weight of 0.1 for index 1830 and 0.9 for index 1850.  You then start with the index 1850, in 1861 you start again to do the smoothing of the change for the index with base in 1850 and the index with base 1870.
•	We will use the combined index to estimate the cycles.


                </article>

                    <div className="col-md-2" />

                </div>

                <div className="row">
                    
                    <div className = "col-md-6" />
                    <div className = "col-md-6">
                        <b> How would you rate this article? </b>
                        
                            <TriangleUp size={30}/>
                            <b className="blog-rating"> 10 </b>
                            <TriangleDown size={30}/>
                        
                    </div>

                    

                </div>

                <div>
                    <h2> Comments </h2>
                    <h3> [Add Your Comment] </h3>
                    <Comment/>
                    <Comment/>
                    <Comment/>

                </div>



            </div>
        )
    }
}

export default BlogPage;