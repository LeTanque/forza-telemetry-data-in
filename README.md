# Forza UDP Telemetry Parser 
<div style="display:flex" >

  <div  >
    Forza Horizon 6 is an arcade-like racing game for Xbox and PC.
    <br/>
    Forza Motorsport 2023 is a simulation-like racing game for Xbox and PC.
    <br/>
    <b>This parser is tested on FH6</b>, but with small modification will work with FM2023.
    <div>
  
  ### Problem
  Tuning can be a daunting task for new and experienced players, but is necessary to unlock a cars potential. Given the complexity of tuning, many players download locked tunes from the marketplace. Locked tunes have values hidden from the player making it much harder to learn from them. There doesn't exist a single tool or repository that can be used to learn what all of variables of tuning do, so it's difficult for player's to understand where to put their focus between improving their driving and/or their tuning.

  ### Solution
  Use the UDP data out feature of Forza, designed for wheel dashboards, parse the stream, and provide strongly typed data for dashboard and intelligence consumption.
    </div>
  </div>
</div>

## Team Havok
This project would not exist if not for *Team Havok* and the beautiful culture of information sharing that has blossomed in our discord and started on Fujimi Kaido, in Forza Motorsport 2023. If you think gatekeeping is lame, race in A class and below, know how to be competitive without being toxic, are interested in meeting some of the fastest Forza drivers in the _world_, apply here: **[Discord Invite](https://discord.gg/qA4JeUdNd)**


<p align="left">
  <a href="https://youtu.be/r31qYQeFCFY?is=Cz0JxLd2vZs5o44i
https://youtu.be/r31qYQeFCFY?is=Cz0JxLd2vZs5o44i">
TEAM HAVOK 2025
  </a>
</p>
^^^ Link to YouTube video 👍🏼


## Notes
This UDP parser is not _everything_ you will need to learn from your telemetry data, but it is the most important first step if you intend to. With the UDP data parsed and typed-out, you can confidently build on top of it.

------------

Effective tuning considers three dimensions:
- Vehicle
- Environment (track)
- Driver

Within those dimensions are many factors, some overlapping with each other, contextually and temporally. This is important to understand because there is no single _best_ tune that can be applied to every car, or even every car with a similar configuration.


------------

This one probably seems obvious, but the driver is central to the control cycle; driver preference _is_ part of the system:
  ```
  Driver
    ↓
  Steering / Brake / Throttle
    ↓
  Vehicle
    ↓
  Telemetry
    ↓
  Driver perception
    ↺
  ```

--------

There is no "meta-tune"; this software will not give you a meta-tune. Meta-tunes are created for gamers seeking the path of least resistance. This project is created for car-nerds in search of beauty. 

--------

Meta-cars are often the cars that received the most R&D from a small subset of the community for any number of reasons. This doesn't mean that they are the only viable options or even the best possible option for you.

--------

Question I ask when consulting on tunes and tuning myself:

“What characteristics produce the fastest, most repeatable laps for this driver under these conditions, and how can telemetry help us identify them?”
